import { Module } from '@nestjs/common';

import { EventEmitterModule } from './event-emitter/event-emitter.module';

@Module({
  imports: [EventEmitterModule],
})
export class EventBusModule {}
