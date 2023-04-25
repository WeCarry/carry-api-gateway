import { Application } from 'express';
import { CommonRoutesConfig } from '../common.routes.config';
import { UsersRoutes } from '../../users/users.routes.config';
import { AuthRoutes } from '../../auth/auth.routes.config';
import { PaymentRoutes } from '../../payments/payments.routes.config';
import { NotificationRoutes } from '../../notificaitons/notifications.routes.config';
import { RideRoutes } from '../../rides/rides.routes.config';

export function registerRoutes(
	routes: Array<CommonRoutesConfig>,
	app: Application
): void {
	routes.push(new AuthRoutes(app));
	routes.push(new UsersRoutes(app));
	routes.push(new PaymentRoutes(app));
	routes.push(new NotificationRoutes(app));
	routes.push(new RideRoutes(app));
}
