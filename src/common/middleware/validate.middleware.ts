// validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'joi';

export function validate(schema: AnySchema) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);

		if (error) {
			res.status(400).json({ message: error.message });
		} else {
			next();
		}
	};
}
