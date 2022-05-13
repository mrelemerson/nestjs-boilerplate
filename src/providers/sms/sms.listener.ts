import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';

import { UserCreatedEvent } from '~/modules/users/events';

@Injectable()
export class SmsListener {
  constructor(
    @InjectQueue('sms')
    private readonly smsQueue: Queue,
  ) {}

  @OnEvent(UserCreatedEvent.EVENT_NAME)
  handleUserCreatedEvent(event: UserCreatedEvent) {
    void this.smsQueue.add('user-created', event);
  }
}
