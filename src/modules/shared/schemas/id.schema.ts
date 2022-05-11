import Joi from 'joi';

export const IdSchema = Joi.object({
  id: Joi.string()
    .uuid({
      version: 'uuidv4',
    })
    .required(),
});
