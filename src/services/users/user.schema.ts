import { Schema, Document, Model, model } from 'mongoose';
import { UserType } from './user.type';

interface UserDocument extends Document {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	userType: UserType;
	phoneNumber: string;
}

export interface UserModel extends Model<UserDocument> {
	findByEmail(email: string): Promise<UserDocument | null>;
	comparePassword(password: string, userPassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, UserModel>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		userType: {
			type: String,
			enum: Object.values(UserType),
			required: true,
		},
		phoneNumber: { type: String, required: true },
	},
	{ timestamps: true }
);

interface PassengerDocument extends UserDocument {
	defaultPaymentMethod: string;
}

const passengerSchema = new Schema<PassengerDocument, PassengerModel>(
	{
		defaultPaymentMethod: { type: String, required: true },
	},
	{ discriminatorKey: 'userType' }
);

interface MerchantDocument extends UserDocument {
	company: string;
	taxId: string;
}

const merchantSchema = new Schema<MerchantDocument, MerchantModel>(
	{
		company: { type: String, required: true },
		taxId: { type: String, required: true },
	},
	{ discriminatorKey: 'userType' }
);

interface DriverDocument extends UserDocument {
	licenseNumber: string;
	vehicle: string;
	isActive: boolean;
}

const driverSchema = new Schema<DriverDocument, DriverModel>(
	{
		licenseNumber: { type: String, required: true },
		vehicle: { type: String, required: true },
		isActive: { type: Boolean, default: false },
	},
	{ discriminatorKey: 'userType' }
);

interface AdminDocument extends UserDocument {}

const adminSchema = new Schema<AdminDocument, AdminModel>(
	{},
	{ discriminatorKey: 'userType' }
);

interface CustomerServiceDocument extends UserDocument {}

const customerServiceSchema = new Schema<
	CustomerServiceDocument,
	CustomerServiceModel
>({}, { discriminatorKey: 'userType' });

export const User = model<UserDocument>('User', userSchema);
export const Passenger = User.discriminator<PassengerDocument>(
	'Passenger',
	passengerSchema
);
export const Merchant = User.discriminator<MerchantDocument>(
	'Merchant',
	merchantSchema
);
export const Driver = User.discriminator<DriverDocument>(
	'Driver',
	driverSchema
);
export const Admin = User.discriminator<AdminDocument>('Admin', adminSchema);
export const CustomerService = User.discriminator<CustomerServiceDocument>(
	'CustomerService',
	customerServiceSchema
);
