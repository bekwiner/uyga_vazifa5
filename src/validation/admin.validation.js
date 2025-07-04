import Joi from "joi";

export const signupValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateValidator = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8),
});
