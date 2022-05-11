import bcrypt from 'bcrypt';

export class HashHelper {
  static hash(plain: string) {
    return bcrypt.hash(plain, 10);
  }

  static verify(hash: string, plain: string) {
    return bcrypt.compare(plain, hash);
  }
}
