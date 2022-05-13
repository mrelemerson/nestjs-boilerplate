import { registerAs } from '@nestjs/config';

export const configuration = registerAs('sms_api', () => ({
  baseURL: String(process.env.SMS_BASE_URL),
  timeout: Number(process.env.SMS_TIMEOUT),
  apiKey: String(process.env.SMS_API_KEY),
}));
