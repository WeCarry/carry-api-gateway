import { Types } from 'mongoose';
import { BaseDao } from '../../common/daos/base.dao';
import { CreateRideDto } from '../dto/createRide.dto';
import { Ride, RideModel } from '../schemas/ride.schema';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');
class RideDao extends BaseDao<Ride> {
	constructor() {
		log('Created new instance of ', RideDao.prototype.constructor.name);
		super(RideModel);
	}

	async createRide(item: CreateRideDto): Promise<Types.ObjectId> {
		try {
			const ride = new this.model({
				...item,
			});
			const result = await this.create(ride);
			return result;
		} catch (error) {
			throw error;
		}
	}
}

export default new RideDao();
