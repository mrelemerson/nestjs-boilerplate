import { Module } from '@nestjs/common';

// import { ApisNetModule } from './apis-net/apis-net.module';
import { CuantoestaeldolarModule } from './cuantoestaeldolar/cuantoestaeldolar.module';

@Module({
  imports: [
    // ApisNetModule,
    CuantoestaeldolarModule,
  ],
})
export class ExchangeRateModule {}
