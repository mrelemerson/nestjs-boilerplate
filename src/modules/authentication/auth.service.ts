import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '~/modules/users/users.service';
import { HashHelper } from '~Helpers/hash.helper';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const found = await this.usersService.findByUsername(username);

    if (found && (await HashHelper.verify(found.password, password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = found;

      return result;
    }

    return null;
  }

  async login(user: any) {
    // TODO hay que cambiar el _id a id
    const payload = { username: user.username, sub: user._id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
