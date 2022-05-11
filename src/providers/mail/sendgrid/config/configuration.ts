import { registerAs } from '@nestjs/config';

export const configuration = registerAs('mail_sendgrid', () => ({
  apiKey: String(process.env.SENDGRID_API_KEY),
  defaultFrom: String(process.env.SENDGRID_DEFAULT_FROM),
}));
