import Joi from 'joi';
import { joiPassword } from 'joi-password';

export const UpdateUserSchema = Joi.object({
  username: Joi.string().min(5).max(200).optional(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .optional(),
  email: Joi.string().email().optional(),
});
