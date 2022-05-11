import { ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';

import { CriteriaDto } from '~/modules/shared/dto';
import { MongoCriteriaConverter } from '~Converters/mongo-criteria.converter';

export class MongoHelper {
  static async findByCriteria<T extends AnyParamConstructor<any>>(
    model: ReturnModelType<T>,
    criteriaDto: CriteriaDto,
  ) {
    const converted = MongoCriteriaConverter.convert(criteriaDto);

    const items = await model
      .find(converted.query, converted.fields, {
        ...converted.options,
      })
      .exec();

    const total = await model.countDocuments(converted.query).exec();

    return {
      items,
      total,
    };
  }
}
