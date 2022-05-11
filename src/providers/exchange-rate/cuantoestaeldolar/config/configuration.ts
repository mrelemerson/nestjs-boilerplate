import { registerAs } from '@nestjs/config';

export const configuration = registerAs(
  'exchange_rate_cuantoestaeldolar',
  () => ({
    url: String(process.env.CUANTOESTAELDOLAR_URL),
  }),
);
