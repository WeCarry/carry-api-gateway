import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import notificationsController from './controllers/notifications.controller';

export class NotificationRoutes extends CommonRoutesConfig {
	constructor(app: Application) {
		super(app, 'NotificationRoutes');
	}
	configureRoutes(): Application {
		this.app
			.route('/notifications')
			.post(notificationsController.createNotification);
		this.app
			.route('/notifications/user/:userId')
			.get(notificationsController.getNotificationsByUserId);
		this.app
			.route('/notifications/:notificationId/read')
			.put(notificationsController.markNotificationAsRead);
		return this.app;
	}
}
