import Joi from 'joi';

export const CriteriaSchema = Joi.object({
  fields: Joi.array().items(Joi.string()).default([]),
  filters: Joi.array()
    .items(
      Joi.object({
        field: Joi.string().required(),
        operator: Joi.valid(
          'eq',
          'ne',
          'gt',
          'gte',
          'lt',
          'lte',
          'in',
        ).required(),
        value: Joi.alternatives(
          Joi.string(),
          Joi.number(),
          Joi.boolean(),
        ).required(),
      }),
    )
    .default([]),
  orders: Joi.array()
    .items(
      Joi.object({
        by: Joi.string().required(),
        type: Joi.valid('asc', 'desc').required(),
      }),
    )
    .default([]),
  page: Joi.number().integer().default(1),
  size: Joi.number().integer().default(10),
});
