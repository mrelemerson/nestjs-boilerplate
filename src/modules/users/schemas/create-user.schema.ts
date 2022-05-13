import Joi from 'joi';
import { joiPassword } from 'joi-password';
import joiPhoneNumber from 'joi-phone-number';

const joi = Joi.extend(joiPhoneNumber);

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
  phone: joi
    .string()
    .phoneNumber({ defaultCountry: 'PE', format: 'e164' })
    .required(),
});
