import { BaseDao } from '../../common/daos/base.dao';
import debug from 'debug';
import { Notification } from '../schemas/notification.schema';
import NotifcationModel from '../schemas/notification.schema';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { Types } from 'mongoose';

const log: debug.IDebugger = debug('app:notifications-dao');
class NotificationsDao extends BaseDao<Notification> {
	constructor() {
		log(
			'Created new instance of ',
			NotificationsDao.prototype.constructor.name
		);
		super(NotifcationModel);
	}

	async markNotificationAsRead(
		notificationId: string
	): Promise<Notification> {
		throw new Error('Method not implemented.');
	}
	async getNotificationsByUserId(userId: string): Promise<Notification[]> {
		throw new Error('Method not implemented.');
	}
	async createNotification(
		notificationData: CreateNotificationDto
	): Promise<Types.ObjectId> {
		return await this.create({
			...notificationData,
			userId: this.toId(notificationData.userId),
		});
	}
}

export default new NotificationsDao();
