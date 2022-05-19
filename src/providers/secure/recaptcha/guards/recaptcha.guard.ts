import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { RecaptchaService } from '../recaptcha.service';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly recaptchaService: RecaptchaService) {}

  canActivate(context: ExecutionContext) {
    const { headers } = context.switchToHttp().getRequest();

    return this.recaptchaService.validate(headers['x-recaptcha-auth']);
  }
}
