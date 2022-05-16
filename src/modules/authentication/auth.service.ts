import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { randomUUID } from 'crypto';

import { UsersService } from '~/modules/users/users.service';
import {
  EventBusService,
  EVENT_BUS,
} from '~/providers/event-bus/event-bus.service';
import { HashHelper } from '~Helpers/hash.helper';
import { ForgotPasswordDto, ResetPasswordDto } from './dto';
import {
  ForgotPasswordRequestedEvent,
  ResetPasswordPerformedEvent,
} from './events';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    @Inject(EVENT_BUS) private readonly eventBusService: EventBusService,
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
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const token = randomUUID();

      // NOTE 5 minutos
      this.cache.set(token, email, { ttl: 300 });

      void this.eventBusService.publish(
        ForgotPasswordRequestedEvent.create({
          id: user.id,
          email: user.email,
          token,
        }),
      );
    }
  }

  async resetPassword({ token, password }: ResetPasswordDto) {
    const email = await this.cache.get<string>(token);

    if (!email) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    await this.usersService.updatePassword(user.id, password);

    void this.eventBusService.publish(
      ResetPasswordPerformedEvent.create({
        id: user.id,
        email: user.email,
      }),
    );

    // NOTE se elimina el token
    await this.cache.del(token);
  }
}
