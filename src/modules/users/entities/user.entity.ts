import { UserRole, UserState } from '../enums';
import { User } from '../users.model';

export class UserEntity {
  private constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly password: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly state: UserState,
    public readonly role: UserRole,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
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
