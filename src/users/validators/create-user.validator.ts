// user.schema.ts
import Joi from 'joi';
import { UserTypes } from '../enums/user-types.enum';

export const createUserValidator = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string()
		.min(8)
		.pattern(
			new RegExp('^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')
		)
		.required(),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	userType: Joi.string()
		.valid(UserTypes.Passenger, UserTypes.Driver, UserTypes.Merchant)
		.required(),
	additionalInfo: Joi.object(),
});
