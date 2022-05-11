import { DateTime } from 'luxon';
import { randomUUID } from 'crypto';

export const EVENT_BUS = Symbol();

export abstract class Event {
  static EVENT_NAME: string;

  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: string;
  readonly eventName: string;

  constructor(
    eventName: string,
    refId: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    this.aggregateId = refId;
    this.eventId = eventId || randomUUID();
    this.occurredOn = occurredOn || DateTime.local().toISO();
    this.eventName = eventName;
  }
}

export interface EventBusService {
  publish(...events: Event[]): Promise<void>;
}
