// user.schema.ts
import Joi from 'joi';

export const createUserValidator = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.min(8)
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
		.required(),
});
