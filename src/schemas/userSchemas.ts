import Joi from 'joi';

export const newUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});
export const logInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});


