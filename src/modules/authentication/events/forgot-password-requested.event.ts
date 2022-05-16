import { Event } from '~/providers/event-bus/event-bus.service';

export class ForgotPasswordRequestedEvent extends Event {
  public static EVENT_NAME = 'forgot-password.requested';

  private constructor(
    readonly id: string,
    readonly email: string,
    readonly token: string,
  ) {
    super(ForgotPasswordRequestedEvent.EVENT_NAME, id);
  }

  static create(params: { id: string; email: string; token: string }) {
    return new ForgotPasswordRequestedEvent(
      params.id,
      params.email,
      params.token,
    );
  }
}
