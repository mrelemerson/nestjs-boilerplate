import { Injectable, Logger } from '@nestjs/common';
import { GoogleRecaptchaException } from '@nestlab/google-recaptcha';
import { GoogleRecaptchaValidator } from '@nestlab/google-recaptcha/services/google-recaptcha.validator';

@Injectable()
export class RecaptchaService {
  private readonly logger = new Logger(RecaptchaService.name);

  constructor(private readonly recaptchaValidator: GoogleRecaptchaValidator) {}

  async validate(recaptchaToken: string) {
    let recaptchaResult: unknown = null;

    try {
      const result = await this.recaptchaValidator.validate({
        response: recaptchaToken,
      });

      recaptchaResult = result;

      if (!result.success) {
        throw new GoogleRecaptchaException(result.errors);
      }

      return true;
    } catch (error) {
      this.logger.error(
        `Recaptcha authentication process failed: ${JSON.stringify(
          recaptchaResult,
        )}`,
        error.stack,
      );

      return false;
    }
  }
}
