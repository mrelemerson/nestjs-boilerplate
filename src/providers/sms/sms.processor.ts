import { Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';

import { UserCreatedEvent } from '~/modules/users/events';
import { SMS, SmsService } from './sms.service';

@Processor('sms')
export class SmsProcessor {
  private readonly logger = new Logger(SmsProcessor.name);

  constructor(@Inject(SMS) private readonly smsService: SmsService) {}

  @Process('user-created')
  async userCreated(job: Job<UserCreatedEvent>) {
    await this.smsService.send({
      phone: job.data.phone,
      message: `Welcome ${job.data.username}!`,
    });
  }
}
