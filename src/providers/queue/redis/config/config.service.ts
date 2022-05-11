import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        queue_redis: {
          host: string;
          port: number;
          db: number;
        };
      },
      true
    >,
  ) {}

  get host() {
    return this.nestConfigService.get('queue_redis.host', { infer: true });
  }

  get port() {
    return this.nestConfigService.get('queue_redis.port', { infer: true });
  }

  get db() {
    return this.nestConfigService.get('queue_redis.db', { infer: true });
  }
}
