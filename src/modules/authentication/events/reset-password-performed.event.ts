import { Event } from '~/providers/event-bus/event-bus.service';

export class ResetPasswordPerformedEvent extends Event {
  public static EVENT_NAME = 'reset-password.performed';

  private constructor(readonly id: string, readonly email: string) {
    super(ResetPasswordPerformedEvent.EVENT_NAME, id);
  }

  static create(params: { id: string; email: string }) {
    return new ResetPasswordPerformedEvent(params.id, params.email);
  }
}
