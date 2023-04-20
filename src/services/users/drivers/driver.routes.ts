import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
	try {
		console.log('Hello world');

		res.send('User list');
	} catch (error) {}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		res.send(`User with id: ${req.params.id}`);
	} catch (error) {}
});

export default router;
