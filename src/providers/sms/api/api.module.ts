import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import axios, { AxiosRequestTransformer } from 'axios';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ApiService } from './api.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.baseURL,
        timeout: configService.timeout,
        transformRequest: [
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (data, headers) => {
            if (headers) headers['x-api-key'] = configService.apiKey;

            return data;
          },
          ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
        ],
      }),
    }),
  ],
  providers: ApiService.providers,
  exports: ApiService.providers,
})
export class ApiModule {}
