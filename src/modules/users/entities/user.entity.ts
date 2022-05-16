import { UserRole, UserState } from '../enums';
import { User } from '../users.model';

export class UserEntity {
  private constructor(
    readonly id: string,
    readonly username: string,
    readonly password: string,
    readonly email: string,
    readonly phone: string,
    readonly state: UserState,
    readonly role: UserRole,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}

  static create(user: User) {
    return new UserEntity(
      user._id,
      user.username,
      user.password,
      user.email,
      user.phone,
      user.state,
      user.role,
      user.createdAt!,
      user.updatedAt!,
    );
  }
}
