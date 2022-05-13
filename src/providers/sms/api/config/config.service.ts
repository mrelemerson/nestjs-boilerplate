import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        sms_api: {
          baseURL: string;
          timeout: number;
          apiKey: string;
        };
      },
      true
    >,
  ) {}

  get baseURL() {
    return this.nestConfigService.get('sms_api.baseURL', {
      infer: true,
    });
  }

  get timeout() {
    return this.nestConfigService.get('sms_api.timeout', {
      infer: true,
    });
  }

  get apiKey() {
    return this.nestConfigService.get('sms_api.apiKey', {
      infer: true,
    });
  }
}
