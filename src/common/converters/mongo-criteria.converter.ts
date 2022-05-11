import dot from 'dot-object';

import {
  FilterOperator,
  OrderType,
  CriteriaDto,
} from '~/modules/shared/dto/criteria.dto';

const equivalents = new Map<FilterOperator, string>();
equivalents.set(FilterOperator.EQ, '$eq');
equivalents.set(FilterOperator.NE, '$ne');
equivalents.set(FilterOperator.GT, '$gt');
equivalents.set(FilterOperator.GTE, '$gte');
equivalents.set(FilterOperator.LT, '$lt');
equivalents.set(FilterOperator.LTE, '$lte');
equivalents.set(FilterOperator.IN, '$in');
equivalents.set(FilterOperator.EXISTS, '$exists');

const equivalentsSort = new Map<OrderType, number>();
equivalentsSort.set(OrderType.ASC, 1);
equivalentsSort.set(OrderType.DESC, -1);

type Query = Record<string, unknown>;

type Fields = Record<string, 1 | 0>;

type Options = {
  sort: Record<string, any>;
  limit: number;
  skip: number;
};

export class MongoCriteriaConverter {
  static convert(criteria: CriteriaDto): {
    query: Query;
    fields: Fields;
    options: Options;
  } {
    const query: Query = {};
    const options: Options = { sort: {}, limit: 10, skip: 0 };
    const fields: Fields = {};

    criteria.filters?.reduce((acc, cur) => {
      if (equivalents.has(cur.operator)) {
        const operator = equivalents.get(cur.operator) as string;

        if (acc[cur.field]) {
          (acc[cur.field] as Record<string, unknown>)[operator] = cur.value;
        } else {
          acc[cur.field] = {
            [operator]: cur.value,
          };
        }
      }
      return acc;
    }, query);

    criteria.orders?.reduce((acc, cur) => {
      if (equivalentsSort.has(cur.type)) {
        acc[cur.by] = equivalentsSort.get(cur.type) as number;
        return acc;
      }
      return acc;
    }, options.sort);

    criteria.fields?.reduce((acc, cur) => {
      acc[cur] = 1;
      return acc;
    }, fields);

    options.limit = criteria.size ?? 10;

    const skip = ((criteria.page ?? 1) - 1) * (criteria.size ?? 10);

    options.skip = skip > 0 ? skip : 0;

    return {
      query: dot.object(dot.dot(query)) as Record<string, unknown>,
      fields,
      options,
    };
  }
}
