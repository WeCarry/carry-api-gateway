import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET;


export function verifyUser(req: Request, res: Response, next: NextFunction) {
	const token = req.header('Authorization');
	if (!token) return res.status(401).send('Access Denied');
	try {
		const verified = jwt.verify(token, TOKEN_SECRET as Secret);
		Object.assign(req, { user: verified });
		next();
	} catch (error) {
		res.status(400).send('Invalid Token');
	}
}
