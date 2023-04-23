import { Document, Model, Types } from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:base-dao');

export abstract class BaseDao<T> {
	protected abstract model: Model<T>;

	constructor() {
		log('Created new instance of BaseDao');
	}

	async create(item: Partial<T>): Promise<Types.ObjectId> {
		try {
			const newItem = new this.model(item);
			const result = await newItem.save();
			return result._id as Types.ObjectId;
		} catch (error) {
			throw error;
		}
	}

	async getById(id: string): Promise<T | undefined> {
		try {
			const result = await this.model.findById(id).exec();
			return result ?? undefined;
		} catch (error) {
			throw error;
		}
	}

	async getList(limit = 25, page = 0): Promise<T[]> {
		try {
			return this.model
				.find()
				.limit(limit)
				.skip(limit * page)
				.exec();
		} catch (error) {
			throw error;
		}
	}

	async updateById(id: string, fields: Partial<T>): Promise<T | undefined> {
		try {
			const result = await this.model
				.findByIdAndUpdate(id, { $set: fields }, { new: true })
				.exec();
			return result ?? undefined;
		} catch (error) {
			throw error;
		}
	}

	async deleteById(id: string): Promise<{ deletedCount?: number }> {
		try {
			const result = await this.model.deleteOne({ _id: id }).exec();
			return result;
		} catch (error) {
			throw error;
		}
	}
}
