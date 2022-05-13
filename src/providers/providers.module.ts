import { Module } from '@nestjs/common';

import { CacheModule } from '~/providers/cache/cache.module';
import { CloudModule } from '~/providers/cloud/cloud.module';
import { DatabaseModule } from '~/providers/database/database.module';
import { EventBusModule } from '~/providers/event-bus/event-bus.module';
import { MailModule } from '~/providers/mail/mail.module';
import { QueueModule } from '~/providers/queue/queue.module';
import { TraceModule } from '~/providers/trace/trace.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    CacheModule,
    CloudModule,
    DatabaseModule,
    EventBusModule,
    MailModule,
    QueueModule,
    TraceModule,
    ExchangeRateModule,
    SmsModule,
  ],
})
export class ProvidersModule {}
