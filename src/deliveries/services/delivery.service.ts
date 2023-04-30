import { Types } from 'mongoose';
import deliveryDao from '../daos/delivery.dao';
import { Delivery } from '../schemas/delivery.schema';

class DeliveryService {
	async createDelivery(delivery: Delivery): Promise<Types.ObjectId> {
		const createdDelivery = await deliveryDao.create(delivery);
		return createdDelivery;
	}

	async getDelivery(id: string): Promise<Delivery | undefined> {
		const delivery = await deliveryDao.getById(id);
		return delivery;
	}

	async updateDelivery(
		id: string,
		updates: Partial<Delivery>
	): Promise<Delivery | undefined> {
		const updatedDelivery = await deliveryDao.updateById(id, updates);
		return updatedDelivery;
	}

	async deleteDelivery(id: string): Promise<void> {
		await deliveryDao.deleteById(id);
	}
}

export default new DeliveryService();
