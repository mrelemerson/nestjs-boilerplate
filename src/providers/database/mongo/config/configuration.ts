import { registerAs } from '@nestjs/config';

export const configuration = registerAs('database_mongo', () => ({
  uri: String(process.env.DATABASE_MONGO_URI),
}));
