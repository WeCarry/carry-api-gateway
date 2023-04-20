import { BaseRepository, MongoDBAdapter } from 'carry-db-driver';
import { driverSchema } from './driver.schema';
import { Driver } from './driver.type';

export class DriverRepository extends BaseRepository<Driver> {
	constructor(adapter: MongoDBAdapter) {
		super({ adapter, collection: 'drivers', schema: driverSchema });
	}

	// You can add additional methods specific to DriverRepository here
}
