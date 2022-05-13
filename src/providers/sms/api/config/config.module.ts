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
        SMS_BASE_URL: Joi.string().uri().required(),
        SMS_TIMEOUT: Joi.number().required(),
        SMS_API_KEY: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
