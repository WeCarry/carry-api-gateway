import { Schema, Types } from 'mongoose';
import rideDao from '../daos/ride.dao';
import { Ride, RideStatus } from '../schemas/ride.schema';
import passengerService from './passenger.service';
import driverService from './driver.service';
import paymentService from '../../payments/services/payment.service';
import { CreateRideDto } from '../dto/createRide.dto';

class RidesService {
	async createRide(rideData: CreateRideDto): Promise<Types.ObjectId> {
		const driver = await driverService.getDriver(rideData.driver);
		const passenger = await passengerService.getPassenger(
			rideData.passenger
		);

		if (!driver || !passenger) {
			throw new Error('Driver or passenger not found');
		}

		const rideId = await rideDao.createRide(rideData);

		return rideId;
	}

	async getRide(rideId: string): Promise<Ride> {
		const ride = await rideDao.getById(rideId);

		if (!ride) {
			throw new Error('Ride not found');
		}

		return ride;
	}

	async updateRide(rideId: string, updateData: Partial<Ride>): Promise<Ride> {
		const ride = await rideDao.updateById(rideId, updateData);

		if (!ride) {
			throw new Error('Ride not found');
		}

		return ride;
	}

	async completeRide(rideId: string): Promise<Ride | undefined> {
		const ride = await this.getRide(rideId);

		if (!ride) {
			throw new Error('Ride not found');
		}

		const paymentResult = await paymentService.processPayment(ride);

		if (!paymentResult.success) {
			throw new Error('Payment processing failed');
		}

		const completedRide = await rideDao.updateById(rideId, {
			status: RideStatus.Completed,
		});

		return completedRide;
	}

	async rateRide(rideId: string, rating: number): Promise<Ride> {
		if (rating < 0 || rating > 5) {
			throw new Error('Invalid rating value');
		}

		const updatedRide = await rideDao.updateById(rideId, { rating });

		if (!updatedRide) {
			throw new Error('Ride not found');
		}

		return updatedRide;
	}
}

export default RidesService;
