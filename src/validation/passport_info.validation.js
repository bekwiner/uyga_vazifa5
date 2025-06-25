import Joi from "joi";

export const passportInfoValidator = Joi.object({
  passportNumber: Joi.string().required().messages({
    "any.required": `"passportNumber" majburiy`,
  }),
  nationality: Joi.string().required().messages({
    "any.required": `"nationality" majburiy`,
  }),
  dateOfBirth: Joi.date().required().messages({
    "any.required": `"dateOfBirth" majburiy`,
  }),
  customer: Joi.string().required().messages({
    "any.required": `"customer" (ID) majburiy`,
  }),
});
