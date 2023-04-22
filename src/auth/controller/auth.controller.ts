import express from 'express';
import debug from 'debug';
import { Encryption } from '../../common/config/encrypt.config';
import { toRes } from '../../common/config/response.config';

const log: debug.IDebugger = debug('app:auth-controller');

/**
 * This value is automatically populated from .env, a file which you will have
 * to create for yourself at the root of the project.
 *
 * See .env.example in the repo for the required format.
 */
// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;

class AuthController {
	async createJWT(req: express.Request, res: express.Response) {
		try {
			if (!jwtSecret) log('jwtSercret does not exist');
			const refreshId = req.body.userId + jwtSecret;
			const { salt, hash } = Encryption.createHashWithSalt(refreshId);
			req.body.refreshKey = salt.export();
			const token = Encryption.createToken(req.body);
			return res.status(201).send(
				toRes(201, 'Token created Successfully', {
					accessToken: token,
					refreshToken: hash,
				})
			);
		} catch (err) {
			log('createJWT error: %O', err);
			return res
				.status(500)
				.send(toRes(500, 'createJWT error: %O', undefined, err));
		}
	}
}

export default new AuthController();
