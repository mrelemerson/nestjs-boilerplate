import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { ClsService } from 'nestjs-cls';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  RequestCreatedEvent,
  ResponseCreatedEvent,
} from '~/modules/shared/events';
import { EventBusService, EVENT_BUS } from '../event-bus/event-bus.service';
import { TraceConstant } from './trace.constant';

@Injectable()
export class TraceInterceptor implements NestInterceptor {
  constructor(
    private readonly cls: ClsService,
    @Inject(EVENT_BUS) private readonly eventBusService: EventBusService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();

    this.eventBusService.publish(
      RequestCreatedEvent.create({
        traceId: this.cls.getId(),
        date: DateTime.now().toJSDate(),
        subject: 'Http Request',
        data: {
          path: req.path,
          params: req.params,
          body: req.body,
          query: req.query,
          headers: req.headers,
          ip: req.ip,
        },
      }),
    );

    return next.handle().pipe(
      catchError((error) => {
        const res = context.switchToHttp().getResponse<Response>();

        res.header(TraceConstant.TRACE_ID, this.cls.getId());

        res.on('close', () => {
          this.eventBusService.publish(
            ResponseCreatedEvent.create({
              traceId: this.cls.getId(),
              date: DateTime.now().toJSDate(),
              subject: 'Http Response',
              data: {
                headers: res.getHeaders(),
                body: error.getResponse
                  ? error.getResponse()
                  : {
                      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                      message: error.message,
                      error: 'Internal Server Error',
                    },
              },
            }),
          );
        });

        return throwError(() => error);
      }),
      tap((body) => {
        const res = context.switchToHttp().getResponse<Response>();

        res.header(TraceConstant.TRACE_ID, this.cls.getId());

        res.on('close', () => {
          this.eventBusService.publish(
            ResponseCreatedEvent.create({
              traceId: this.cls.getId(),
              date: DateTime.now().toJSDate(),
              subject: 'Http Response',
              data: {
                headers: res.getHeaders(),
                body,
              },
            }),
          );
        });
      }),
    );
  }
}
