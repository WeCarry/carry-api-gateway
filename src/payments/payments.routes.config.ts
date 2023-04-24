import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import paymentController from './controllers/payment.controller';

export class PaymentRoutes extends CommonRoutesConfig {
	constructor(app: Application) {
		super(app, 'PaymentsRoutes');
	}

	configureRoutes(): Application {
		this.app
			.route('/payments')
			.post(paymentController.createCard)
			.get(paymentController.checkCard);

		this.app
			.route('/payments/verify')
			.post(paymentController.getVerifyCode)
			.put(paymentController.verifyCard);

		this.app.route('/payments/remove').post(paymentController.removeCard);

		return this.app;
	}
}
