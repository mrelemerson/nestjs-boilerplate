import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { RegisterTraceDto } from './dto/register-trace-dto';
import { TraceService } from './trace.service';

@Processor('trace')
export class TraceProcessor {
  constructor(private readonly traceService: TraceService) {}

  @Process()
  register(job: Job<RegisterTraceDto>) {
    void this.traceService.register(job.data);
  }
}
