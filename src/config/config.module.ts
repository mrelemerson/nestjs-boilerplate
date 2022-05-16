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
        APP_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .required(),
        APP_PORT: Joi.number().required(),
        APP_GLOBAL_PREFIX: Joi.string().required(),
        APP_URL: Joi.string().uri().required(),
        WEB_URL: Joi.string().uri().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
