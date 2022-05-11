/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(initialValue: any, metadata: ArgumentMetadata) {
    const { value, error } = this.schema.validate(initialValue);

    if (error) {
      throw new BadRequestException(error.message);
    }

    return value;
  }
}
