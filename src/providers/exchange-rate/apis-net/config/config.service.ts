import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        exchange_rate_apis_net: {
          baseURL: string;
          timeout: number;
        };
      },
      true
    >,
  ) {}

  get baseURL() {
    return this.nestConfigService.get('exchange_rate_apis_net.baseURL', {
      infer: true,
    });
  }

  get timeout() {
    return this.nestConfigService.get('exchange_rate_apis_net.timeout', {
      infer: true,
    });
  }
}
