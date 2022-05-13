import { Event } from '~/providers/event-bus/event-bus.service';
import { UserRole } from '../enums';

export class UserCreatedEvent extends Event {
  public static EVENT_NAME = 'user.created';

  private constructor(
    readonly id: string,
    readonly username: string,
    readonly email: string,
    readonly phone: string,
    readonly role: UserRole,
  ) {
    super(UserCreatedEvent.EVENT_NAME, id);
  }

  static create(params: {
    id: string;
    username: string;
    email: string;
    phone: string;
    role: UserRole;
  }) {
    return new UserCreatedEvent(
      params.id,
      params.username,
      params.email,
      params.phone,
      params.role,
    );
  }
}
