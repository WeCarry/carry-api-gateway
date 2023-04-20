export enum UserType {
	PASSENGER = 'PASSENGER',
	MERCHANT = 'MERCHANT',
	DRIVER = 'DRIVER',
	ADMIN = 'ADMIN',
	CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
}

export interface User {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	userType: UserType;
	phoneNumber: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Passenger extends User {
	defaultPaymentMethod: string;
}

export interface Merchant extends User {
	company: string;
	taxId: string;
}

export interface Driver extends User {
	licenseNumber: string;
	vehicle: string;
	isActive: boolean;
}

export interface Admin extends User {}

export interface CustomerService extends User {}
