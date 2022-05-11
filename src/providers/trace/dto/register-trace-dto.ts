import { TraceType } from '../enums';

export class RegisterTraceDto {
  traceId: string;
  subject: string;
  date: Date;
  type: TraceType;
  data: Record<string, unknown>;
}
