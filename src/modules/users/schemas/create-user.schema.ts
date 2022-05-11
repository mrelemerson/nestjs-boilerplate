import Joi from 'joi';
import { joiPassword } from 'joi-password';

export const CreateUserSchema = Joi.object({
  username: Joi.string().min(5).max(200).required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .required(),
  email: Joi.string().email().required(),
});
