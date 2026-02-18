import Joi from 'joi';

export const emailValidator = Joi.object({
  email: Joi.string().required().email()
});

export const signinValidator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required()
});

export const signupValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().default(''),
  country: Joi.string().default('')
});
