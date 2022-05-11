import { registerAs } from '@nestjs/config';

export const configuration = registerAs('cache_redis', () => ({
  host: String(process.env.CACHE_REDIS_HOST),
  port: Number(process.env.CACHE_REDIS_PORT),
  ttl: Number(process.env.CACHE_REDIS_TTL),
  db: Number(process.env.CACHE_REDIS_DB),
}));
