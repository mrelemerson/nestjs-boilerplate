import { defaultClasses, DocumentType, pre, prop } from '@typegoose/typegoose';
import { LeanDocument } from 'mongoose';

import { HashHelper } from '~Helpers/hash.helper';
import { UserRole, UserState } from './enums';

@pre<User>('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    HashHelper.hash(this.password)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
})
export class User extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public phone!: string;

  @prop({
    required: true,
    enum: UserState,
    type: String,
    default: () => UserState.ACTIVE,
  })
  public state!: UserState;

  @prop({
    required: true,
    enum: UserRole,
    type: String,
    default: () => UserRole.OPERATOR,
  })
  public role!: UserRole;
}

export type UserDoc = DocumentType<User>;

export type UserLean = LeanDocument<UserDoc>;
