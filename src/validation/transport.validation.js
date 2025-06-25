import Joi from "joi";

export const transportValidator = Joi.object({
  type: Joi.string().valid("bus", "train", "plane").required().messages({
    "any.only": "type faqat bus, train yoki plane bo‘lishi kerak",
    "string.base": "type satr (string) bo‘lishi kerak",
    "any.required": "type majburiy",
  }),

  name: Joi.string().min(2).max(50).required().messages({
    "string.base": "name satr bo‘lishi kerak",
    "string.min": "name kamida 2 ta belgidan iborat bo‘lishi kerak",
    "string.max": "name 50 belgidan oshmasligi kerak",
    "any.required": "name majburiy",
  }),

  seatCount: Joi.number().integer().min(1).required().messages({
    "number.base": "seatCount raqam bo‘lishi kerak",
    "number.min": "seatCount kamida 1 bo‘lishi kerak",
    "any.required": "seatCount majburiy",
  }),
});
