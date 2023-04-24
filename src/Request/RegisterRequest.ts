import Joi from '@hapi/joi';

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(8).required()
});

