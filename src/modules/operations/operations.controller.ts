import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { TtlHelper } from '~Helpers/ttl.helper';
import { TraceInterceptor } from '~/providers/trace/trace.interceptor';
import { JwtAuthGuard } from '../authentication/guards';
import { OperationsService } from './operations.service';

@Controller('operations')
@UseGuards(JwtAuthGuard)
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get('exchange-rate-1')
  @CacheKey('sunat1')
  @CacheTTL(() => TtlHelper.endOf('day'))
  @UseInterceptors(TraceInterceptor, CacheInterceptor)
  exchangeRate1() {
    return this.operationsService.exchangeRate1();
  }

  @Get('exchange-rate-2')
  exchangeRate2() {
    return this.operationsService.exchangeRate2();
  }
}
