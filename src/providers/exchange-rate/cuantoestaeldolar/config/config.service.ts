import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        exchange_rate_cuantoestaeldolar: {
          url: string;
        };
      },
      true
    >,
  ) {}

  get url() {
    return this.nestConfigService.get('exchange_rate_cuantoestaeldolar.url', {
      infer: true,
    });
  }
}
