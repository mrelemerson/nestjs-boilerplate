import Joi from 'joi';
import { joiPassword } from 'joi-password';

export const ResetPasswordSchema = Joi.object({
  token: Joi.string().uuid({ version: 'uuidv4' }).required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .required(),
});
