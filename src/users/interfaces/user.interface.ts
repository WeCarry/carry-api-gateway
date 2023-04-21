export interface IUser extends Document {
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
	permissionLevel?: number;
}
