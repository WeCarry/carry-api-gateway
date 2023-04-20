import { Request, Response, Router } from 'express';
import { PassengerService } from './passenger.service';
import Container from 'typedi';

const router = Router();
// const userService = Container.get(PassengerService);
router.get('/', async (req: Request, res: Response) => {
	try {
		const userService = new PassengerService()
		const users = await userService.getPassenger();
		res.json(users);
	} catch (error) {}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		res.send(`User with id: ${req.params.id}`);
	} catch (error) {}
});

router.post('/', async (req: Request, res: Response) => {});

export default router;
