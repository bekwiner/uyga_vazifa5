const Joi = require('joi');

const adminValidationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateAdmin = (data) => adminValidationSchema.validate(data);

module.exports = validateAdmin;
