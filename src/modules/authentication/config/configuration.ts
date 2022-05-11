import { registerAs } from '@nestjs/config';

export const configuration = registerAs('authentication', () => ({
  secret: String(process.env.AUTHENTICATION_SECRET),
}));
