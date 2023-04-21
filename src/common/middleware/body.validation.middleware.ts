import express, { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AnySchema } from 'joi';

class BodyValidationMiddleware {
	verifyBodyFieldsErrors(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).send({ errors: errors.array() });
		}
		next();
	}

	validate(schema: AnySchema) {
		return (req: Request, res: Response, next: NextFunction) => {
			const { error } = schema.validate(req.body);

			if (error) {
				res.status(400).json({ message: error.message });
			} else {
				next();
			}
		};
	}
}

export default new BodyValidationMiddleware();
