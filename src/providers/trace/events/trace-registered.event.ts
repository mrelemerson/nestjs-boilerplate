import { Event } from '~/providers/event-bus/event-bus.service';
import { TraceType } from '../enums';

export class TraceRegisteredEvent extends Event {
  public static EVENT_NAME = 'trace.registered';

  private constructor(
    readonly traceId: string,
    readonly date: Date,
    readonly subject: string,
    readonly type: TraceType,
    readonly data: Record<string, unknown>,
  ) {
    super(TraceRegisteredEvent.EVENT_NAME, traceId);
  }

  static create(params: {
    traceId: string;
    date: Date;
    subject: string;
    type: TraceType;
    data: Record<string, unknown>;
  }) {
    return new TraceRegisteredEvent(
      params.traceId,
      params.date,
      params.subject,
      params.type,
      params.data,
    );
  }
}
