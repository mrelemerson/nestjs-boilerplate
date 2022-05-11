import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '~/app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const appConfig = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix(appConfig.globalPrefix);

  await app.listen(appConfig.port);
}

bootstrap();
