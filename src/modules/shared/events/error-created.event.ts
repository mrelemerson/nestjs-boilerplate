import { Event } from '~/providers/event-bus/event-bus.service';

export class ErrorCreatedEvent extends Event {
  public static EVENT_NAME = 'error.created';

  private constructor(
    readonly traceId: string,
    readonly date: Date,
    readonly subject: string,
    readonly cause: string | Record<string, unknown>,
    readonly message: string,
    readonly stack: string,
  ) {
    super(ErrorCreatedEvent.EVENT_NAME, traceId);
  }

  static create(params: {
    traceId: string;
    date: Date;
    subject: string;
    cause: string | Record<string, unknown>;
    message: string;
    stack: string;
  }) {
    return new ErrorCreatedEvent(
      params.traceId,
      params.date,
      params.subject,
      params.cause,
      params.message,
      params.stack,
    );
  }
}
