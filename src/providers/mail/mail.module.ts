import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { SendgridModule } from './sendgrid/sendgrid.module';
import { MailListener } from './mail.listener';
import { MailProcessor } from './mail.processor';

@Module({
  imports: [
    SendgridModule,
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  providers: [MailListener, MailProcessor],
})
export class MailModule {}
