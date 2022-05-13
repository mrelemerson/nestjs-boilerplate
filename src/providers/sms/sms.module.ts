import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { ApiModule } from './api/api.module';
import { SmsListener } from './sms.listener';
import { SmsProcessor } from './sms.processor';

@Module({
  imports: [
    ApiModule,
    BullModule.registerQueue({
      name: 'sms',
    }),
  ],
  providers: [SmsListener, SmsProcessor],
})
export class SmsModule {}
