import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { ConfigModule as AppConfigModule } from '~/config/config.module';
import { SendgridModule } from './sendgrid/sendgrid.module';
import { MailListener } from './mail.listener';
import { MailProcessor } from './mail.processor';

@Module({
  imports: [
    AppConfigModule,
    SendgridModule,
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  providers: [MailListener, MailProcessor],
})
export class MailModule {}
