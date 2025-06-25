import Joi from "joi";
import mongoose from "mongoose";

export const createPassportValidator = Joi.object({
  customer: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }),
  series: Joi.string().required(),
  number: Joi.string().required(),
  issuedBy: Joi.string().optional(),
  dateOfIssue: Joi.date().optional(),
  dateOfExpiry: Joi.date().optional()
});
