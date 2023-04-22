import { model, Schema, Types } from 'mongoose';
import { UserTypes } from '../enums/user-types.enum';
import { driverSchema } from './driver.schema';
import { passengerSchema } from './passenger.schema';
import { merchantSchema } from './merchant.schema';
export interface User extends Document {
	_id: Types.ObjectId;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	userType: UserTypes;
}

const userSchema = new Schema<User>(
	{
		email: String,
		password: String,
		firstName: String,
		lastName: String,
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
