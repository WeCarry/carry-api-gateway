import { Application } from 'express';
import { CommonRoutesConfig } from '../common.routes.config';
import { UsersRoutes } from '../../users/users.routes.config';
import { AuthRoutes } from '../../auth/auth.routes.config';

export function registerRoutes(
	routes: Array<CommonRoutesConfig>,
	app: Application
): void {
	routes.push(new AuthRoutes(app));
	routes.push(new UsersRoutes(app));
}
