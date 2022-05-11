import { Module } from '@nestjs/common';

import { ConfigModule } from '~/config/config.module';
import { ModulesModule } from '~/modules/modules.module';
import { ProvidersModule } from '~/providers/providers.module';

@Module({
  imports: [ConfigModule, ModulesModule, ProvidersModule],
})
export class AppModule {}
