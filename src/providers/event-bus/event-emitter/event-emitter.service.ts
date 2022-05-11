import { Injectable } from 'nestjs-injectable';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { Event, EventBusService, EVENT_BUS } from '../event-bus.service';

@Injectable().As(EVENT_BUS)
export class EventEmitterService implements EventBusService {
  static providers = [];

  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publish(...events: Event[]): Promise<void> {
    events.forEach(({ eventName, ...values }) =>
      this.eventEmitter.emit(eventName, values),
    );
  }
}
