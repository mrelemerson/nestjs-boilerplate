import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import { Injectable } from 'nestjs-injectable';
import { lastValueFrom } from 'rxjs';
import { ClsService } from 'nestjs-cls';
import { DateTime } from 'luxon';

import { ExchangeRateService, EXCHANGE_RATE } from '../exchange-rate.service';
import { SunatResponseInterface } from '../interfaces';
import {
  EventBusService,
  EVENT_BUS,
} from '~/providers/event-bus/event-bus.service';
import {
  ErrorCreatedEvent,
  RequestCreatedEvent,
  ResponseCreatedEvent,
} from '~/modules/shared/events';

@Injectable().As(EXCHANGE_RATE)
export class ApisNetService implements ExchangeRateService {
  static providers = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly cls: ClsService,
    @Inject(EVENT_BUS) private readonly eventBusService: EventBusService,
  ) {
    httpService.axiosRef.interceptors.request.use((config) => {
      this.eventBusService.publish(
        RequestCreatedEvent.create({
          traceId: this.cls.getId(),
          date: DateTime.now().toJSDate(),
          subject: 'ApisNet Api Request',
          data: config.data ?? {},
        }),
      );

      return config;
    });

    httpService.axiosRef.interceptors.response.use(
      (response) => {
        this.eventBusService.publish(
          ResponseCreatedEvent.create({
            traceId: this.cls.getId(),
            date: DateTime.now().toJSDate(),
            subject: 'ApisNet Api Response',
            data: {
              headers: response.headers,
              status: response.status,
              statusText: response.statusText,
              data: response.data ?? {},
            },
          }),
        );

        return response;
      },
      (error) => Promise.reject(error),
    );
  }

  async sunat(): Promise<SunatResponseInterface> {
    try {
      const $data = this.httpService.get<{
        compra: number;
        venta: number;
        [key: string]: unknown;
      }>('v1/tipo-cambio-sunat');

      const {
        data: { compra, venta },
      } = await lastValueFrom($data);

      return { compra, venta };
    } catch (error) {
      this.eventBusService.publish(
        ErrorCreatedEvent.create({
          traceId: this.cls.getId(),
          date: DateTime.now().toJSDate(),
          subject: 'ApisNet Api Error',
          cause: {},
          message: error.message,
          stack: error.stack,
        }),
      );

      throw error;
    }
  }
}
