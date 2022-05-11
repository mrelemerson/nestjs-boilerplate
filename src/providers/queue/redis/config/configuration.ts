import { registerAs } from '@nestjs/config';

export const configuration = registerAs('queue_redis', () => ({
  host: String(process.env.QUEUE_REDIS_HOST),
  port: Number(process.env.QUEUE_REDIS_PORT),
  db: Number(process.env.QUEUE_REDIS_DB),
}));
