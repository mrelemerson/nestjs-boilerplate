import { registerAs } from '@nestjs/config';

export const configuration = registerAs('secure_recaptcha', () => ({
  secretKey: String(process.env.SECURE_RECAPTCHA_SECRET_KEY),
  score: Number(process.env.SECURE_RECAPTCHA_SCORE),
}));
