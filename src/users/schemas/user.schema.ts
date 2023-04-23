import { model, Schema, Types } from 'mongoose';
import { UserTypes } from '../enums/user-types.enum';
import { Driver, driverSchema } from './driver.schema';
import { Passenger, passengerSchema } from './passenger.schema';
import { Merchant, merchantSchema } from './merchant.schema';
import { BaseModel } from '../../common/types/base.model.type';

export type User = BaseModel & {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	userType: UserTypes;
	verified: boolean;
	otp: number;
	permissionFlags?: number;
	additionalInfo: Driver | Passenger | Merchant | undefined;
};

const userSchema = new Schema<User>(
	{
		email: { type: String, unique: true },
		password: { type: String, select: false },
		firstName: String,
		lastName: String,
		permissionFlags: Number,
		deletedAt: { type: Date, select: false },
		verified: { type: Boolean, default: false },
		otp: Number,
		userType: {
			type: String,
			enum: UserTypes,
			required: true,
		},
	},
	{
		discriminatorKey: 'userType',
		collection: 'users', // Explicitly set the collection name
	}
);

const UserModel = model<User>('User', userSchema);

UserModel.discriminator('Passenger', passengerSchema);
UserModel.discriminator('Merchanant', merchantSchema);
UserModel.discriminator('Driver', driverSchema);

export default UserModel;
