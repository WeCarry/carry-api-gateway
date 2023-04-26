import { toRes } from '../../common/config/response.config';
import { Delivery } from '../schemas/delivery.schema';
import { Request, Response } from 'express';
import deliveryService from '../services/delivery.service';

class DeliveryController {
	async createDelivery(req: Request, res: Response): Promise<void> {
		try {
			const delivery = (req as any).body;
			const createdDelivery = await deliveryService.createDelivery(
				delivery
			);
			res.status(201).json(
				toRes(201, 'Delivery created', createdDelivery)
			);
		} catch (error) {
			res.status(500).json(
				toRes(500, 'Failed to create delivery', undefined, error)
			);
		}
	}

	async getDelivery(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;
			const delivery = await deliveryService.getDelivery(id);
			if (!delivery) {
				res.status(404).json(toRes(404, 'Delivery not found'));
				return;
			}
			res.json(toRes(200, 'Delivery retrieved', delivery));
		} catch (error) {
			res.status(500).json(
				toRes(500, 'Failed to get delivery', undefined, error)
			);
		}
	}

	async updateDelivery(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;
			const updates: Partial<Delivery> = req.body;
			const updatedDelivery = await deliveryService.updateDelivery(
				id,
				updates
			);
			if (!updatedDelivery) {
				res.status(404).json(toRes(404, 'Delivery not found'));
				return;
			}
			res.json(toRes(200, 'Delivery updated', updatedDelivery));
		} catch (error) {
			res.status(500).json(
				toRes(500, 'Failed to update delivery', undefined, error)
			);
		}
	}

	async deleteDelivery(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;
			await deliveryService.deleteDelivery(id);
			res.sendStatus(204);
		} catch (error) {
			res.status(500).json(
				toRes(500, 'Failed to delete delivery', undefined, error)
			);
		}
	}
}

export default new DeliveryController();
