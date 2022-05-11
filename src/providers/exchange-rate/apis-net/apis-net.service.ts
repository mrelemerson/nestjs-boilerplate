import { HttpService } from '@nestjs/axios';
import { Injectable } from 'nestjs-injectable';
import { lastValueFrom } from 'rxjs';

import { ExchangeRateService, EXCHANGE_RATE } from '../exchange-rate.service';
import { SunatResponseInterface } from '../interfaces';

@Injectable().As(EXCHANGE_RATE)
export class ApisNetService implements ExchangeRateService {
  static providers = [];

  constructor(private readonly httpService: HttpService) {
    httpService.axiosRef.interceptors.request.use((config) => {
      // dummy

      return config;
    });

    httpService.axiosRef.interceptors.response.use(
      (response) => {
        // dummy

        return response;
      },
      (error) => Promise.reject(error),
    );
  }

  async sunat(): Promise<SunatResponseInterface> {
    const $data = this.httpService.get<{
      compra: number;
      venta: number;
      [key: string]: unknown;
    }>('v1/tipo-cambio-sunat');

    const {
      data: { compra, venta },
    } = await lastValueFrom($data);

    return { compra, venta };
  }
}
