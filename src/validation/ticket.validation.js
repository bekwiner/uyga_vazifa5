import Joi from 'joi';

export const ticketValidator = Joi.object({
  transport: Joi.string().length(24).required(),
  customer: Joi.string().length(24).required(),
  price: Joi.number().min(0).required(),
  seatNumber: Joi.number().min(1).required()
});
