import { Request, Response, Router } from 'express';
import Container from 'typedi';
import { PassengerService } from '../passengers/passenger.service';

const router = Router();
Container.get(PassengerService);
router.get('/', async (req: Request, res: Response) => {
	try {
		let { firstName, lastName, email, password } = req.body;

		res.send('User list');
	} catch (error) {}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		res.send(`User with id: ${req.params.id}`);
	} catch (error) {}
});

export default router;
