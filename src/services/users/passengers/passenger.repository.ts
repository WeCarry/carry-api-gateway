import { BaseRepository, MongoDBAdapter } from 'carry-db-driver';
import { User } from './passenger.type';
import { passengerSchema } from './passenger.schema';
import Container, { Service } from 'typedi';
import { ObjectId } from 'mongodb';
import { TYPES } from '../../../config/types';

export class PassengerRepository extends BaseRepository<User> {
	constructor() {
		super({
			adapter: Container.get(TYPES.MongoDBAdapter),
			collection: 'users',
			schema: passengerSchema,
		});
	}

	async getPassengerId() {
		return new ObjectId();
	}
}
