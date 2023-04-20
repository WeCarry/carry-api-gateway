import { User } from '../../utils/types/user.type';

export type Admin = User & {
	phone: string;
	role: string;
};
