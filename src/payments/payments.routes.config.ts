import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';

export class PaymentRoutes extends CommonRoutesConfig {
	constructor(app: Application) {
		super(app, 'PaymentsRoutes');
	}

	configureRoutes(): Application {
		this.app.route('/payments').all().get().post();
		this.app.param('paymentId', () => true);
		this.app.route('/payments/:paymentId').all().get().put();
		return this.app;
	}
}
