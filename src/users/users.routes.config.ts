import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/user.controller';
import UsersMiddleware from './middleware/users.middleware';
import express from 'express';
import { createUserValidator } from './validators/create-user.validator';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

export class UsersRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, 'UsersRoutes');
	}

	configureRoutes(): express.Application {
		this.app
			.route(`/users`)
			.get(jwtMiddleware.validJWTNeeded, UsersController.listUsers)
			.post(
				BodyValidationMiddleware.validate(createUserValidator),
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

		this.app.put(`/users/resetPassword`, [])

		this.app.patch(`/users/:userId`, [
			UsersMiddleware.validatePatchEmail,
			UsersController.patch,
		]);

		return this.app;
	}
}
