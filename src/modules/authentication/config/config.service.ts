import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        authentication: {
          secret: string;
        };
      },
      true
    >,
  ) {}

  get secret() {
    return this.nestConfigService.get('authentication.secret', { infer: true });
  }
}
