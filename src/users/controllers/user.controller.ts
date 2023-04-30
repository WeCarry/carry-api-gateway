// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we import our newly created user services
import usersService from '../services/users.service';

// we use debug with a custom context as described in Part 1
import debug from 'debug';
import { Encryption } from '../../common/config/encrypt.config';
import { toRes } from '../../common/config/response.config';

const log: debug.IDebugger = debug('app:users-controller');
class UsersController {
	async listUsers(req: express.Request, res: express.Response) {
		try {
			const users = await usersService.list(100, 0);
			res.status(200).send(toRes(200, 'Success', users));
		} catch (error) {
			log(error);
			res.status(500).send(
				toRes(500, 'Error', undefined, 'Unable to list users.')
			);
		}
	}

	async getUserById(req: express.Request, res: express.Response) {
		try {
			const user = await usersService.readById(req.body.id);
			res.status(200).send(toRes(200, 'Success', user));
		} catch (error) {
			log(error);
			res.status(500).send(
				toRes(500, 'Error', undefined, 'Unable to retrieve user.')
			);
		}
	}

	async createUser(req: express.Request, res: express.Response) {
		try {
			req.body.password = await Encryption.hashPassword(
				req.body.password
			);
			const userId = await usersService.create(req.body);
			res.status(201).send(toRes(201, 'Success', { id: userId }));
		} catch (error) {
			log(error);
			res.status(500).send(
				toRes(500, 'Error', undefined, 'Unable to create user.')
			);
		}
	}

	async patch(req: express.Request, res: express.Response) {
		try {
			if (req.body.password) {
				req.body.password = await Encryption.hashPassword(
					req.body.password
				);
			}
			log(await usersService.patchById(req.body.id, req.body));
			res.status(204).send();
		} catch (error) {
			log(error);
			res.status(500).send(
				toRes(500, 'Error', undefined, 'Unable to update user.')
			);
		}
	}

	async put(req: express.Request, res: express.Response) {
		try {
			req.body.password = await Encryption.hashPassword(
				req.body.password
			);
			log(await usersService.putById(req.body.id, req.body));
			res.status(204).send();
		} catch (error) {
			log(error);
			res.status(500).send(
				toRes(500, 'Error', undefined, 'Unable to update user.')
			);
		}
	}

	async resetPassword(req: express.Request, res: express.Response) {
		try {
			// Implement reset password logic
		} catch (error) {
			log(error);
			res.status(500).send(
				toRes(500, 'Error', undefined, 'Unable to reset password.')
			);
		}
	}

	async removeUser(req: express.Request, res: express.Response) {
		try {
			log(await usersService.deleteById(req.body.id));
			res.status(204).send();
		} catch (error) {
			log(error);
			res.status(500).send(
				toRes(500, 'Error', undefined, 'Unable to delete user.')
			);
		}
	}
}

export default new UsersController();
