import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';

import {
  ErrorCreatedEvent,
  RequestCreatedEvent,
  ResponseCreatedEvent,
} from '~/modules/shared/events';
import { TraceType } from './enums';
import { RegisterTraceDto } from './dto';

@Injectable()
export class TraceListener {
  constructor(
    @InjectQueue('trace')
    private readonly traceQueue: Queue<RegisterTraceDto>,
  ) {}

  @OnEvent(ErrorCreatedEvent.EVENT_NAME)
  handleErrorCreatedEvent(event: ErrorCreatedEvent) {
    void this.traceQueue.add({
      traceId: event.traceId,
      subject: event.subject,
      date: event.date,
      type: TraceType.ERROR,
      data: {
        cause: event.cause,
        message: event.message,
        stack: event.stack,
      },
    });
  }

  @OnEvent(RequestCreatedEvent.EVENT_NAME)
  handleRequestCreatedEvent(event: RequestCreatedEvent) {
    void this.traceQueue.add({
      traceId: event.traceId,
      subject: event.subject,
      date: event.date,
      type: TraceType.LOG,
      data: event.data,
    });
  }

  @OnEvent(ResponseCreatedEvent.EVENT_NAME)
  handleResponseCreatedEvent(event: ResponseCreatedEvent) {
    void this.traceQueue.add({
      traceId: event.traceId,
      subject: event.subject,
      date: event.date,
      type: TraceType.LOG,
      data: event.data,
    });
  }
}
