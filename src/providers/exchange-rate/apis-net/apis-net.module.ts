import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import axios, { AxiosRequestTransformer } from 'axios';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ApisNetService } from './apis-net.service';

@Global()
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
            return data;
          },
        ],
        ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
      }),
    }),
  ],
  providers: ApisNetService.providers,
  exports: ApisNetService.providers,
})
export class ApisNetModule {}
