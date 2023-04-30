import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import chatController from './controllers/chat.controller';

export class ChatRoutes extends CommonRoutesConfig {
	constructor(app: Application) {
		super(app, 'ChatRoutes');
	}

	configureRoutes(): Application {
		this.app
			.route('/chat')
			.get(chatController.getChats)
			.post(chatController.createChat);

		return this.app;
	}
}
