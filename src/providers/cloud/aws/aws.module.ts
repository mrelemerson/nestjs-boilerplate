import { Global, Module } from '@nestjs/common';
import { AwsSdkModule } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AWSService } from './aws.service';

@Global()
@Module({
  imports: [
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          region: configService.region,
          credentials: {
            accessKeyId: configService.accessKey,
            secretAccessKey: configService.secretKey,
          },
        }),
      },
      services: [S3],
    }),
  ],
  exports: [AWSService],
  providers: [AWSService],
})
export class AWSModule {}
