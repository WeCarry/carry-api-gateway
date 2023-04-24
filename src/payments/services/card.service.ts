import { Types } from 'mongoose';
import { Card } from '../schemas/card.schema';
import cardDao from '../daos/card.dao';

export interface ICardService {
	createCard(
		userId: Types.ObjectId,
		expire: string,
		number: number,
		token: string
	): Promise<Types.ObjectId>;
	getCardById(id: string): Promise<Card | undefined>;
	getCardsByUserId(userId: string): Promise<Card[]>;
	removeCard(id: string): Promise<boolean>;
}

export class CardService implements ICardService {
	async createCard(
		userId: Types.ObjectId,
		expire: string,
		number: number,
		token: string
	): Promise<Types.ObjectId> {
		const card = await cardDao.create({
			userId,
			expire,
			number,
			token,
		});

		return card;
	}

	async getCardById(id: string): Promise<Card | undefined> {
		const card = await cardDao.getById(id);

		return card ? card : undefined;
	}

	async getCardsByUserId(userId: string): Promise<Card[]> {
		const cards = await cardDao.find({ userId });

		return cards;
	}

	async removeCard(id: string): Promise<boolean> {
		const result = await cardDao.deleteOne({ _id: id });

		return result.deletedCount === 1;
	}
}

export default new CardService();
