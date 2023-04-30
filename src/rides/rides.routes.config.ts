import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import ridesConrtoller from './controllers/rides.conrtoller';

export class RideRoutes extends CommonRoutesConfig {
	constructor(app: Application) {
		super(app, 'RideRoutes');
	}

	configureRoutes(): Application {
		this.app.route('/ride').post(ridesConrtoller.createRide);
		this.app
			.route('/ride/:rideId')
			.get(ridesConrtoller.getRide)
			.patch(ridesConrtoller.updateRide);

		this.app
			.route('/ride/:rideId/complete')
			.patch(ridesConrtoller.updateRide);

		this.app.route('/ride/:rideId/rate').patch(ridesConrtoller.rateRide);

		return this.app;
	}
}
