// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { secretKey } from './config';

// export const authenticateClass = (optional = false) => {
// 	return <T extends { new (...args: any[]): {} }>(constructor: T) => {
// 		return class extends constructor {
// 			constructor(...args: any[]) {
// 				super(...args);
// 				const originalMethods = Object.getOwnPropertyNames(
// 					constructor.prototype
// 				);

// 				for (let methodName of originalMethods) {
// 					const originalMethod = this[methodName];

// 					if (
// 						typeof originalMethod !== 'function' ||
// 						methodName === 'constructor'
// 					) {
// 						continue;
// 					}

// 					this[methodName] = (
// 						req: Request,
// 						res: Response,
// 						next: NextFunction
// 					) => {
// 						const authHeader = req.headers['authorization'];
// 						const token = authHeader && authHeader.split(' ')[1];

// 						if (!token) {
// 							if (optional) {
// 								return originalMethod.call(
// 									this,
// 									req,
// 									res,
// 									next
// 								);
// 							}
// 							return res
// 								.status(401)
// 								.json({ message: 'Unauthorized' });
// 						}

// 						jwt.verify(token, secretKey, (err, decoded) => {
// 							if (err) {
// 								return res
// 									.status(403)
// 									.json({ message: 'Forbidden' });
// 							}

// 							req.session = decoded;
// 							return originalMethod.call(this, req, res, next);
// 						});
// 					};
// 				}
// 			}
// 		};
// 	};
// };
