import { Module } from '@nestjs/common';

import { CacheModule } from './cache/cache.module';
import { CloudModule } from './cloud/cloud.module';
import { DatabaseModule } from './database/database.module';
import { EventBusModule } from './event-bus/event-bus.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { MailModule } from './mail/mail.module';
import { QueueModule } from './queue/queue.module';
import { SecureModule } from './secure/secure.module';
import { SmsModule } from './sms/sms.module';
import { TraceModule } from './trace/trace.module';

@Module({
  imports: [
    CacheModule,
    CloudModule,
    DatabaseModule,
    EventBusModule,
    ExchangeRateModule,
    MailModule,
    QueueModule,
    SecureModule,
    SmsModule,
    TraceModule,
  ],
})
export class ProvidersModule {}
