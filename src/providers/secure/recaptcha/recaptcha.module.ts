import { Global, Module } from '@nestjs/common';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { IncomingMessage } from 'http';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { RecaptchaService } from './recaptcha.service';

@Global()
@Module({
  imports: [
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secretKey: configService.secretKey,
        response: (req: IncomingMessage) =>
          (req.headers['x-recaptcha-auth'] || '').toString(),
        skipIf: process.env.NODE_ENV !== 'production',
        score: configService.score,
      }),
    }),
  ],
  exports: [RecaptchaService],
  providers: [RecaptchaService],
})
export class RecaptchaModule {}
