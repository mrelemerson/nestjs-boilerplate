import { CacheModule, Module } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore.create({
          db: configService.db,
          host: configService.host,
          port: configService.port,
        }),
        ttl: configService.ttl,
      }),
      isGlobal: true,
    }),
  ],
})
export class RedisModule {}
