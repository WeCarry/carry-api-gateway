import { ObjectId } from "mongodb";

export type User = {
	_id: ObjectId;
	username?: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	userType: UserType;
};

export enum UserType {
	Passenger = 'PASSENGER',
	Merchant = 'MERCHANT',
	Driver = 'DRIVER',
	Admin = 'ADMIN',
	CusotmerService = 'CUSTOMER_SERVICE',
}
