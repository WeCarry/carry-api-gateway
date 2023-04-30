import usersDao, { UsersDao } from '../../users/daos/users.dao';
import { User } from '../../users/schemas/user.schema';

class DriverService {
	private driverDao: UsersDao;

	constructor() {
		this.driverDao = usersDao;
	}

	async getDriver(driverId: string): Promise<User> {
		const driver = await this.driverDao.getDriverById(driverId);

		if (!driver) {
			throw new Error('Driver not found');
		}

		return driver;
	}

	async updateDriver(
		driverId: string,
		updateData: Partial<User>
	): Promise<User> {
		const driver = await this.driverDao.updateById(driverId, updateData);

		if (!driver) {
			throw new Error('Driver not found');
		}

		return driver;
	}
}

export default new DriverService();
