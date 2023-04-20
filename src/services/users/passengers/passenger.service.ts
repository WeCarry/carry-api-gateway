import { inject, injectable } from 'inversify';
import { PassengerRepository } from './passenger.repository';
import { Service } from 'typedi';
import { ObjectId } from 'mongodb';
import { log } from 'console';
import { UserType } from '../../utils/types/user.type';

export class PassengerService {
	private passengerRepository = new PassengerRepository();
	constructor() {
		console.log('this is passenger service');
	}
	public async getPassenger() {
		await this.passengerRepository.create({
			_id: new ObjectId(''),
			firstName: 'John',
			lastName: 'Doe',
			email: 'b.fayyoz@gmail.com',
			password: 'Qwerty@123',
			createdAt: new Date(),
			updatedAt: new Date(),
			userType: UserType.Passenger,
		});
		const users = await this.passengerRepository.find({});
		log(users);

		return users;
	}
}
