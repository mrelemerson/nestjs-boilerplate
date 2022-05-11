import { Event } from '~/providers/event-bus/event-bus.service';

export class RequestCreatedEvent extends Event {
  public static EVENT_NAME = 'request.created';

  private constructor(
    readonly traceId: string,
    readonly date: Date,
    readonly subject: string,
    readonly data: Record<string, unknown>,
  ) {
    super(RequestCreatedEvent.EVENT_NAME, traceId);
  }

  static create(params: {
    traceId: string;
    date: Date;
    subject: string;
    data: Record<string, unknown>;
  }) {
    return new RequestCreatedEvent(
      params.traceId,
      params.date,
      params.subject,
      params.data,
    );
  }
}
