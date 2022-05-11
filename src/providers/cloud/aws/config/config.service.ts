import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(
    private nestConfigService: NestConfigService<
      {
        cloud_aws: {
          accessKey: string;
          secretKey: string;
          region: string;
        };
      },
      true
    >,
  ) {}

  get accessKey() {
    return this.nestConfigService.get('cloud_aws.accessKey', { infer: true });
  }

  get secretKey() {
    return this.nestConfigService.get('cloud_aws.secretKey', { infer: true });
  }

  get region() {
    return this.nestConfigService.get('cloud_aws.region', { infer: true });
  }
}
