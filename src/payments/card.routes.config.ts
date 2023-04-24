import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import cardController from './controllers/card.controller';

export class CardRoutes extends CommonRoutesConfig {
	constructor(app: Application) {
		super(app, 'CardRoutes');
	}

	configureRoutes(): Application {
		this.app
			.route('/cards')
			.post(cardController.createCard)
			.get(cardController.getCardsByUserId);

		this.app
			.route('/cards/:id')
			.get(cardController.getCardById)
			.delete(cardController.removeCard);

		return this.app;
	}
}
