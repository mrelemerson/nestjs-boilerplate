import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        cache_redis: {
          host: string;
          port: number;
          ttl: number;
          db: number;
        };
      },
      true
    >,
  ) {}

  get host() {
    return this.nestConfigService.get('cache_redis.host', { infer: true });
  }

  get port() {
    return this.nestConfigService.get('cache_redis.port', { infer: true });
  }

  get ttl() {
    return this.nestConfigService.get('cache_redis.ttl', { infer: true });
  }

  get db() {
    return this.nestConfigService.get('cache_redis.db', { infer: true });
  }
}
