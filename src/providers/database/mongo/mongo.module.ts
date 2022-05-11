import { TypegooseModule } from 'nestjs-typegoose';
import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.uri,
      }),
    }),
  ],
})
export class MongoModule {}
