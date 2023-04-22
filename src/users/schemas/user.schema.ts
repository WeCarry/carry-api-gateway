import { model, Schema, Types } from 'mongoose';
import { UserTypes } from '../enums/user-types.enum';
import { Driver, driverSchema } from './driver.schema';
import { Passenger, passengerSchema } from './passenger.schema';
import { Merchant, merchantSchema } from './merchant.schema';
export type User = ({
	_id: Types.ObjectId;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	userType: UserTypes;
	permissionFlag?: number;
} & Document) &
	(Driver | Passenger | Merchant);

const userSchema = new Schema<User>(
	{
		email: String,
		password: String,
		firstName: String,
		lastName: String,
		permissionFlag: Number,
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
