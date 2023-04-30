import usersDao, { UsersDao } from '../../users/daos/users.dao';
import { User } from '../../users/schemas/user.schema';

class PassengerService {
	private passengerDao: UsersDao;

	constructor() {
		this.passengerDao = usersDao;
	}

	async getPassenger(passengerId: string): Promise<User> {
		const passenger = await this.passengerDao.getPassengerById(passengerId);

		if (!passenger) {
			throw new Error('Passenger not found');
		}

		return passenger;
	}

	async updatePassenger(
		passengerId: string,
		updateData: Partial<User>
	): Promise<User> {
		const passenger = await this.passengerDao.updateById(
			passengerId,
			updateData
		);

		if (!passenger) {
			throw new Error('Passenger not found');
		}

		return passenger;
	}
}

export default new PassengerService();
