import {
  defaultClasses,
  DocumentType,
  modelOptions,
  prop,
  Severity,
} from '@typegoose/typegoose';
import { LeanDocument } from 'mongoose';

import { TraceType } from './enums';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: { minimize: false },
})
export class Trace extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public _id!: string;

  @prop({ required: true })
  public traceId!: string;

  @prop({ required: true })
  public subject!: string;

  @prop({ required: true, type: Date })
  public date!: Date;

  @prop({ required: true, enum: TraceType, type: String })
  public type!: TraceType;

  @prop({ required: true })
  public data!: Record<string, unknown>;
}

export type TraceDoc = DocumentType<Trace>;

export type TraceLean = LeanDocument<TraceDoc>;
