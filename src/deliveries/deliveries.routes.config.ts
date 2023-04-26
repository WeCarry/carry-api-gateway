import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import deliveryController from './controllers/delivery.controller';

export class DeliveryRoutes extends CommonRoutesConfig {
	constructor(app: Application) {
		super(app, 'DeliveryRoutes');
	}

	configureRoutes(): Application {
		this.app.route('/delivery').post(deliveryController.createDelivery);
		this.app
			.route('/deliver/:id')
			.get(deliveryController.getDelivery)
			.patch(deliveryController.updateDelivery)
			.delete(deliveryController.deleteDelivery);
		return this.app;
	}
}
