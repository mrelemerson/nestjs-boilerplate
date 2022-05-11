import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { ConfigService } from './config.service';
import { configuration } from './configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        CACHE_REDIS_HOST: Joi.string().required(),
        CACHE_REDIS_PORT: Joi.number().required(),
        CACHE_REDIS_TTL: Joi.number().required(),
        CACHE_REDIS_DB: Joi.number().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
