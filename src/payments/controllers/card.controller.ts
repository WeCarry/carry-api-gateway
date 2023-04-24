import { Request, Response } from 'express';
import cardService, { CardService } from '../services/card.service';
import { toRes } from '../../common/config/response.config';

class CardController {
	async createCard(req: Request, res: Response) {
		const { userId, expire, number, token } = req.body;

		try {
			const cardId = await cardService.createCard(
				userId,
				expire,
				number,
				token
			);

			res.status(201).send(
				toRes(201, 'Card created successfully', { id: cardId })
			);
		} catch (error) {
			console.error('Error creating card', error);
			res.status(500).send(
				toRes(500, 'Internal server error', undefined, error)
			);
		}
	}

	async getCardById(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const card = await cardService.getCardById(id);

			if (card) {
				res.status(200).send(toRes(200, 'Success', card));
			} else {
				res.status(404).send(toRes(404, 'Card not found'));
			}
		} catch (error) {
			console.error('Error getting card', error);
			res.status(500).send(
				toRes(500, 'Internal server error', undefined, error)
			);
		}
	}

	async getCardsByUserId(req: Request, res: Response) {
		const { userId } = req.params;

		try {
			const cards = await cardService.getCardsByUserId(userId);

			res.status(200).send(toRes(200, 'Success', cards));
		} catch (error) {
			console.error('Error getting cards', error);
			res.status(500).send(
				toRes(500, 'Internal server error', undefined, error)
			);
		}
	}

	async removeCard(req: Request, res: Response) {
		const { id } = req.params;

		try {
			const result = await cardService.removeCard(id);

			if (result) {
				res.status(204).send();
			} else {
				res.status(404).send(toRes(404, 'Card not found'));
			}
		} catch (error) {
			console.error('Error removing card', error);
			res.status(500).send(
				toRes(500, 'Internal server error', undefined, error)
			);
		}
	}
}

export default new CardController();
