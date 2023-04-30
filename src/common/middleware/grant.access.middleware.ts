import express from 'express';
class GrantAccessMiddleware {
	async grantAccess(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const method = req.method;
		const route = req.path;
		
	}
}
