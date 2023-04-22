import { UserTypes } from '../enums/user-types.enum';

export interface CreateUserDto {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	userType: UserTypes;
}
