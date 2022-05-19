import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        secure_recaptcha: {
          secretKey: string;
          score: number;
        };
      },
      true
    >,
  ) {}

  get secretKey() {
    return this.nestConfigService.get('secure_recaptcha.secretKey', {
      infer: true,
    });
  }

  get score() {
    return this.nestConfigService.get('secure_recaptcha.score', {
      infer: true,
    });
  }
}
