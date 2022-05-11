import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        mail_sendgrid: {
          apiKey: string;
          defaultFrom: string;
        };
      },
      true
    >,
  ) {}

  get apiKey() {
    return this.nestConfigService.get('mail_sendgrid.apiKey', { infer: true });
  }

  get defaultFrom() {
    return this.nestConfigService.get('mail_sendgrid.defaultFrom', {
      infer: true,
    });
  }
}
