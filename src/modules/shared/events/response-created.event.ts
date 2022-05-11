import { Event } from '~/providers/event-bus/event-bus.service';

export class ResponseCreatedEvent extends Event {
  public static EVENT_NAME = 'response.created';

  private constructor(
    readonly traceId: string,
    readonly date: Date,
    readonly subject: string,
    readonly data: Record<string, unknown>,
  ) {
    super(ResponseCreatedEvent.EVENT_NAME, traceId);
  }

  static create(params: {
    traceId: string;
    date: Date;
    subject: string;
    data: Record<string, unknown>;
  }) {
    return new ResponseCreatedEvent(
      params.traceId,
      params.date,
      params.subject,
      params.data,
    );
  }
}
