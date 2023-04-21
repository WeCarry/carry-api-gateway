// user.schema.ts
import Joi from 'joi';

export const createUserSchema = Joi.object({
	name: Joi.string().required(),
	age: Joi.number().integer().min(0).required(),
	email: Joi.string().email().required(),
});
