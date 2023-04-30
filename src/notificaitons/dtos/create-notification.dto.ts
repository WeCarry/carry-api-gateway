import { NotificationTypes } from '../schemas/notification.schema';

export type CreateNotificationDto = {
	userId: string;
	type: NotificationTypes;
	title: string;
	message: string;
};
