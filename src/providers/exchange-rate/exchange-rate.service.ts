import { SunatResponseInterface } from './interfaces';

export const EXCHANGE_RATE = Symbol();

export interface ExchangeRateService {
  sunat(): Promise<SunatResponseInterface>;
}
