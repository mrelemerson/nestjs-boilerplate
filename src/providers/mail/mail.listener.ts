import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Queue } from 'bull';

import {
  ForgotPasswordRequestedEvent,
  ResetPasswordPerformedEvent,
} from '~/modules/authentication/events';
import { ErrorCreatedEvent } from '~/modules/shared/events';
import { UserCreatedEvent } from '~/modules/users/events';

@Injectable()
export class MailListener {
  constructor(
    @InjectQueue('mail')
    private readonly mailQueue: Queue,
  ) {}

  @OnEvent(ErrorCreatedEvent.EVENT_NAME)
  handleOrderCreatedEvent(event: ErrorCreatedEvent) {
    void this.mailQueue.add('error', event);
  }

  @OnEvent(UserCreatedEvent.EVENT_NAME)
  handleUserCreatedEvent(event: UserCreatedEvent) {
    void this.mailQueue.add('user-created', event);
  }

  @OnEvent(ForgotPasswordRequestedEvent.EVENT_NAME)
  handleForgotPasswordRequestedEvent(event: ForgotPasswordRequestedEvent) {
    void this.mailQueue.add('forgot-password-requested', event);
  }

  @OnEvent(ResetPasswordPerformedEvent.EVENT_NAME)
  handleResetPasswordPerformedEvent(event: ResetPasswordPerformedEvent) {
    void this.mailQueue.add('reset-password-performed', event);
  }
}
