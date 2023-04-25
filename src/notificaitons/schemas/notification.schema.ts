import { Schema, Types, model } from 'mongoose';
import { BaseModel } from '../../common/types/base.model.type';
import { User } from '../../users/schemas/user.schema';

export enum NotificationTypes {
	Taxi = 'TAXI',
	Delivery = 'DELIVERY',
}

export type Notification = BaseModel & {
	userId: Types.ObjectId | User;
	type: NotificationTypes;
	title: string;
	message: string;
	read: boolean;
};

const notificationSchema = new Schema<Notification>({
	userId: { type: Types.ObjectId, ref: 'User', required: true },
	type: { type: String, enum: NotificationTypes, required: true },
	title: { type: String, required: true },
	message: { type: String, required: true },
	read: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

const NotifcationModel = model<Notification>(
	'Notification',
	notificationSchema
);

export default NotifcationModel;
