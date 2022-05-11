import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { TypegooseModule } from 'nestjs-typegoose';
import { randomUUID } from 'crypto';

import { Trace } from './trace.model';
import { TraceService } from './trace.service';
import { TraceProcessor } from './trace.processor';
import { TraceListener } from './trace.listener';
import { TraceConstant } from './trace.constant';

@Module({
  imports: [
    ClsModule.register({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator(req) {
          return req.headers[TraceConstant.TRACE_ID] ?? randomUUID();
        },
      },
    }),
    TypegooseModule.forFeature([Trace]),
    BullModule.registerQueue({
      name: 'trace',
    }),
  ],
  providers: [TraceService, TraceProcessor, TraceListener],
})
export class TraceModule {}
