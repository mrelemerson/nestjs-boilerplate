import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.host,
          port: configService.port,
          db: configService.db,
        },
      }),
    }),
  ],
})
export class RedisModule {}
