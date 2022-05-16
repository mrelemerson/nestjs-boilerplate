import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { ConfigService as AppConfigService } from '~/config/config.service';
import {
  ForgotPasswordRequestedEvent,
  ResetPasswordPerformedEvent,
} from '~/modules/authentication/events';
import { ErrorCreatedEvent } from '~/modules/shared/events';
import { UserCreatedEvent } from '~/modules/users/events';

@Processor('mail')
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly appConfigService: AppConfigService,
  ) {}

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

  @Process('forgot-password-requested')
  async forgotPasswordRequested(job: Job<ForgotPasswordRequestedEvent>) {
    const { email, token } = job.data;

    try {
      const result = await this.mailerService.sendMail({
        to: email,
        subject: 'forgot-password-requested',
        template: 'forgot-password-requested',
        context: {
          link: `${this.appConfigService.webUrl}/auth/reset-password/${token}`,
        },
      });

      return result;
    } catch (error) {
      this.logger.error(
        'Failed to send forgot-password-requested email',
        error.stack,
      );

      throw error;
    }
  }

  @Process('reset-password-performed')
  async resetPasswordPerformed(job: Job<ResetPasswordPerformedEvent>) {
    const { email } = job.data;

    try {
      const result = await this.mailerService.sendMail({
        to: email,
        subject: 'reset-password-performed',
        template: 'reset-password-performed',
        context: {},
      });

      return result;
    } catch (error) {
      this.logger.error(
        'Failed to send reset-password-performed email',
        error.stack,
      );

      throw error;
    }
  }
}
