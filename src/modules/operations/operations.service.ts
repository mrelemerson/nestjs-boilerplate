import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TtlHelper } from '~/common/helpers/ttl.helper';

import {
  ExchangeRateService,
  EXCHANGE_RATE,
} from '~/providers/exchange-rate/exchange-rate.service';

@Injectable()
export class OperationsService {
  constructor(
    @Inject(EXCHANGE_RATE)
    private readonly exchangeRateService: ExchangeRateService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  exchangeRate1() {
    return this.exchangeRateService.sunat();
  }

  async exchangeRate2() {
    const found = await this.cache.get('sunat2');

    if (found) return found;

    const data = await this.exchangeRateService.sunat();

    await this.cache.set('sunat2', data, { ttl: TtlHelper.endOf('day') });

    return data;
  }
}
