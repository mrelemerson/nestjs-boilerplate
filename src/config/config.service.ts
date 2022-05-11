import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        app: {
          env: string;
          port: number;
          globalPrefix: string;
        };
      },
      true
    >,
  ) {}

  get env() {
    return this.nestConfigService.get('app.env', { infer: true });
  }

  get port() {
    return this.nestConfigService.get('app.port', { infer: true });
  }

  get globalPrefix() {
    return this.nestConfigService.get('app.globalPrefix', { infer: true });
  }
}
