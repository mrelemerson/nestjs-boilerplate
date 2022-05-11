import { registerAs } from '@nestjs/config';

export const configuration = registerAs('app', () => ({
  env: String(process.env.APP_ENV),
  port: Number(process.env.APP_PORT),
  globalPrefix: String(process.env.APP_GLOBAL_PREFIX),
}));
