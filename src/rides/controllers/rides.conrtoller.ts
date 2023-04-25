import { Request, Response } from 'express';
import { CreateRideDto } from '../dto/createRide.dto';
import rideService from '../services/ride.service';
class RidesController {
	public createRide = async (req: Request, res: Response) => {
		try {
			const rideData: CreateRideDto = req.body;
			const rideId = await rideService.createRide(rideData);
			res.status(201).json({ rideId });
		} catch (error) {
			res.status(400).json({ error: error });
		}
	};

	public getRide = async (req: Request, res: Response) => {
		try {
			const rideId = req.params.rideId;
			const ride = await rideService.getRide(rideId);
			res.json(ride);
		} catch (error) {
			res.status(404).json({ error: error });
		}
	};

	public updateRide = async (req: Request, res: Response) => {
		try {
			const rideId = req.params.rideId;
			const updateData = req.body;
			const updatedRide = await rideService.updateRide(
				rideId,
				updateData
			);
			res.json(updatedRide);
		} catch (error) {
			res.status(404).json({ error: error });
		}
	};

	public completeRide = async (req: Request, res: Response) => {
		try {
			const rideId = req.params.rideId;
			const completedRide = await rideService.completeRide(rideId);
			res.json(completedRide);
		} catch (error) {
			res.status(400).json({ error: error });
		}
	};

	public rateRide = async (req: Request, res: Response) => {
		try {
			const rideId = req.params.rideId;
			const rating = req.body.rating;
			const updatedRide = await rideService.rateRide(rideId, rating);
			res.json(updatedRide);
		} catch (error) {
			res.status(400).json({ error: error });
		}
	};
}

export default new RidesController();
