import { registerAs } from '@nestjs/config';

export const configuration = registerAs('exchange_rate_apis_net', () => ({
  baseURL: String(process.env.APIS_NET_BASE_URL),
  timeout: String(process.env.APIS_NET_TIMEOUT),
}));
