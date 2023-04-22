// user.schema.ts
import Joi from 'joi';
import { UserTypes } from '../enums/user-types.enum';

export const createUserValidator = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.min(8)
		.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
		.required(),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	userType: Joi.string()
		.valid(UserTypes.Passenger, UserTypes.Driver, UserTypes.Merchant)
		.required(),
});
