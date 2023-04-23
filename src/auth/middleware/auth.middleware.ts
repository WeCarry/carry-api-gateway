import { NextFunction, Request, Response } from 'express';
import usersService from '../../users/services/users.service';
import { Encryption } from '../../common/config/encrypt.config';
import { toRes } from '../../common/config/response.config';

class AuthMiddleware {
	async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
		const user = await usersService.getUserByEmailWithPassword(
			req.body.email
		);

		if (user) {
			const passwordHash = user.password;
			if (!passwordHash) {
				console.log('Password Has does not found');
			}
			if (
				await Encryption.comparePassword(
					req.body.password,
					passwordHash
				)
				// true
			) {
				req.body = {
					userId: user._id,
					email: user.email,
					permissionFlags: user.permissionFlags,
					userType: user.userType,
				};
				return next();
			}
		}
		// Giving the same message in both cases
		// helps protect against cracking attempts:
		res.status(400).send(
			toRes(400, 'Something went wrong', undefined, {
				errors: ['Invalid email and/or password'],
			})
		);
	}
}

export default new AuthMiddleware();
