import { toRes } from '../../common/config/response.config';
import express from 'express';
import notificationsService from '../services/notifications.service';
import { CreateNotificationDto } from '../dtos/create-notification.dto';

class NotificaionsController {
	async createNotification(req: express.Request, res: express.Response) {
		try {
			const notificationData: CreateNotificationDto = req.body;
			const notificationId =
				await notificationsService.createNotification(notificationData);
			res.status(201).json(
				toRes(201, 'Notification created successfully', {
					notificationId,
				})
			);
		} catch (error) {
			res.status(500).json(
				toRes(500, 'Error creating notification', undefined, error)
			);
		}
	}

	async getNotificationsByUserId(
		req: express.Request,
		res: express.Response
	) {
		try {
			const userId = req.params.userId;
			const notifications =
				await notificationsService.getNotificationsByUserId(userId);
			res.status(200).json(
				toRes(
					200,
					'Notifications retrieved successfully',
					notifications
				)
			);
		} catch (error) {
			res.status(500).json(
				toRes(500, 'Error retrieving notifications', undefined, error)
			);
		}
	}

	async markNotificationAsRead(req: express.Request, res: express.Response) {
		try {
			const notificationId = req.params.notificationId;
			const notification =
				await notificationsService.markNotificationAsRead(
					notificationId
				);
			if (notification) {
				res.status(200).json(
					toRes(200, 'Notification marked as read', notification)
				);
			} else {
				res.status(404).json(toRes(404, 'Notification not found'));
			}
		} catch (error) {
			res.status(500).json(
				toRes(
					500,
					'Error marking notification as read',
					undefined,
					error
				)
			);
		}
	}
}
