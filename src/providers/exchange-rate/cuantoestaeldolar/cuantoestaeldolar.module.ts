import { Global, Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { CuantoestaeldolarService } from './cuantoestaeldolar.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: CuantoestaeldolarService.providers,
  exports: CuantoestaeldolarService.providers,
})
export class CuantoestaeldolarModule {}
