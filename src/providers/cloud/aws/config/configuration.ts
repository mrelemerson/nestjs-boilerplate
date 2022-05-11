import { registerAs } from '@nestjs/config';

export const configuration = registerAs('cloud_aws', () => ({
  accessKey: String(process.env.AWS_ACCESS_KEY),
  secretKey: String(process.env.AWS_SECRET_KEY),
  region: String(process.env.AWS_REGION),
}));
