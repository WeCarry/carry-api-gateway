import { NextFunction, Request, Response } from 'express';
import usersService from '../../users/services/users.service';
import { Encryption } from '../../common/config/encrypt.config';

class AuthMiddleware {
	private static JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

	async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
		const user: any = await usersService.getUserByEmailWithPassword(
			req.body.email
		);
		if (user) {
			const passwordHash = user.password;
			if (
				await Encryption.comparePassword(
					req.body.password,
					passwordHash
				)
			) {
				req.body = {
					userId: user._id,
					email: user.email,
					permissionFlags: user.permissionFlags,
				};
				return next();
			}
		}
		// Giving the same message in both cases
		// helps protect against cracking attempts:
		res.status(400).send({ errors: ['Invalid email and/or password'] });
	}
}

export default new AuthMiddleware();
