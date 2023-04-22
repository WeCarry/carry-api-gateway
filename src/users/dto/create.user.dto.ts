import Joi from 'joi';

export class CreateUserDto {
	email!: string;
	password!: string;
	firstName!: string;
	lastName!: string;

	static schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).required(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
	});
}
