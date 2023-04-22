import { NextFunction, Request, Response } from 'express';
import usersService from '../../users/services/users.service';
import { Encryption } from '../../common/config/encrypt.config';
import { User } from '../../users/schemas/user.schema';

class AuthMiddleware {
	private static JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

	async verifyUserPassword(req: Request, res: Response, next: NextFunction) {
		const user: User = await usersService.getUserByEmailWithPassword(
			req.body.email
		);
		console.log(user);

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
					permissionFlags: user.permissionFlag,
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
