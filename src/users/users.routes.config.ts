import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/user.controller';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';
import { validate } from '../common/middleware/validate.middleware';

export class UsersRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, 'UsersRoutes');
	}

	configureRoutes(): express.Application {
		this.app.route(`/users`).get(UsersController.listUsers).post(
			// validate(),
			UsersMiddleware.validateRequiredUserBodyFields,
			UsersMiddleware.validateSameEmailDoesntExist,
			UsersController.createUser
		);

		this.app.param(`userId`, UsersMiddleware.extractUserId);
		this.app
			.route(`/users/:userId`)
			.all(UsersMiddleware.validateUserExists)
			.get(UsersController.getUserById)
			.delete(UsersController.removeUser);

		this.app.put(`/users/:userId`, [
			UsersMiddleware.validateRequiredUserBodyFields,
			UsersMiddleware.validateSameEmailBelongToSameUser,
			UsersController.put,
		]);

		this.app.patch(`/users/:userId`, [
			UsersMiddleware.validatePatchEmail,
			UsersController.patch,
		]);

		return this.app;
	}
}
