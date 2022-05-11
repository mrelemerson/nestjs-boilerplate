import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { randomUUID } from 'crypto';
import { ClsService } from 'nestjs-cls';
import { InjectModel } from 'nestjs-typegoose';

import { RegisterTraceDto } from './dto';
import { Trace } from './trace.model';

@Injectable()
export class TraceService {
  constructor(
    private readonly cls: ClsService,
    @InjectModel(Trace)
    private readonly traceModel: ReturnModelType<typeof Trace>,
  ) {}

  register(registerTraceDto: RegisterTraceDto) {
    return this.traceModel.create({
      _id: randomUUID(),
      ...registerTraceDto,
    });
  }
}
