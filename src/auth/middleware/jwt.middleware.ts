import express from 'express';
import crypto from 'crypto';
import { Jwt } from '../../common/types/jwt';
import usersService from '../../users/services/users.service';
import { User } from '../../users/schemas/user.schema';
import { Encryption } from '../../common/config/encrypt.config';
import { toRes } from '../../common/config/response.config';

// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;

class JwtMiddleware {
	verifyRefreshBodyField(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (req.body && req.body.refreshToken) {
			return next();
		} else {
			return res
				.status(400)
				.send({ errors: ['Missing required field: refreshToken'] });
		}
	}

	async validRefreshNeeded(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const user = (await usersService.getUserByEmailWithPassword(
			res.locals.jwt.email
		)) as User;
		const salt = crypto.createSecretKey(
			Buffer.from(res.locals.jwt.refreshKey.data)
		);
		const hash = crypto
			.createHmac('sha512', salt)
			.update(res.locals.jwt.userId + jwtSecret)
			.digest('base64');
		if (hash === req.body.refreshToken) {
			req.body = {
				userId: user._id,
				email: user.email,
				permissionFlags: user.permissionFlags,
				userType: user.userType,
			};
			return next();
		} else {
			return res.status(400).send({ errors: ['Invalid refresh token'] });
		}
	}

	validJWTNeeded(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (req.headers['authorization']) {
			console.log('I WAS ABLE TO GET ACCESS TO AUTHORIZATION');
			try {
				const authorization = req.headers['authorization'].split(' ');
				if (authorization[0] !== 'Bearer') {
					return res.status(401).send();
				} else {
					res.locals.jwt = Encryption.verifyToken(
						authorization[1]
					) as Jwt;
					next();
				}
			} catch (err) {
				return res
					.status(403)
					.send(
						toRes(
							403,
							'Error occured while validating token',
							undefined,
							err
						)
					);
			}
		} else {
			return res
				.status(401)
				.send(
					toRes(
						401,
						'Error occured while validating token',
						undefined,
						'Authorization Bearer Token is not provided.'
					)
				);
		}
	}
}

export default new JwtMiddleware();
