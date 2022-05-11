import { Module } from '@nestjs/common';

import { AWSModule } from './aws/aws.module';

@Module({
  imports: [AWSModule],
})
export class CloudModule {}
