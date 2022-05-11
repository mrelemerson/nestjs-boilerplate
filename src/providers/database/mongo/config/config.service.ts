import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        database_mongo: {
          uri: string;
        };
      },
      true
    >,
  ) {}

  get uri() {
    return this.nestConfigService.get('database_mongo.uri', { infer: true });
  }
}
