import { Module } from '@nestjs/common';

import { RecaptchaModule } from './recaptcha/recaptcha.module';

@Module({
  imports: [RecaptchaModule],
})
export class SecureModule {}
