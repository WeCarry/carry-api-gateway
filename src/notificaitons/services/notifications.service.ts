import { Types } from 'mongoose';
import notificationsDao from '../daos/notifications.dao';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { Notification } from '../schemas/notification.schema';

class NotificationService {
	async createNotification(
		notificationData: CreateNotificationDto
	): Promise<Types.ObjectId> {
		return await notificationsDao.createNotification(notificationData);
	}

	async getNotificationsByUserId(userId: string): Promise<Notification[]> {
		return await notificationsDao.getNotificationsByUserId(userId);
	}

	async markNotificationAsRead(
		notificationId: string
	): Promise<Notification> {
		return await notificationsDao.markNotificationAsRead(notificationId);
	}
}

export default new NotificationService();
