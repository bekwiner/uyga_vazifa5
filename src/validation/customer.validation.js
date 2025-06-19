import Joi from "joi";

export const signupValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  fullName: Joi.string().min(3).required(),
  phone: Joi.string().min(10).required(),
});

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updateValidator = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8),
  fullName: Joi.string(),
  phone: Joi.string(),
});
