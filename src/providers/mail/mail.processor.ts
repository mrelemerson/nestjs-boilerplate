import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { ErrorCreatedEvent } from '~/modules/shared/events';
import { UserCreatedEvent } from '~/modules/users/events';

@Processor('mail')
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(private readonly mailerService: MailerService) {}

  @Process('error')
  async error(job: Job<ErrorCreatedEvent>) {
    const { subject, cause, ...rest } = job.data;

    try {
      const result = await this.mailerService.sendMail({
        subject,
        template: 'error',
        context: {
          cause: typeof cause === 'string' ? cause : JSON.stringify(cause),
          ...rest,
        },
      });

      return result;
    } catch (error) {
      this.logger.error('Failed to send error email', error.stack);

      throw error;
    }
  }

  @Process('user-created')
  async userCreated(job: Job<UserCreatedEvent>) {
    const { email } = job.data;

    try {
      const result = await this.mailerService.sendMail({
        to: email,
        subject: 'user-created',
        template: 'user-created',
        context: {},
      });

      return result;
    } catch (error) {
      this.logger.error('Failed to send user-created email', error.stack);

      throw error;
    }
  }
}
