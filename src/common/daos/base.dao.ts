import {
	AggregateOptions,
	Document,
	FilterQuery,
	Model,
	QueryOptions,
	Types,
	UpdateQuery,
	UpdateWriteOpResult,
} from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:base-dao');

export abstract class BaseDao<T> {
	protected model: Model<T>;

	constructor(_model: Model<T>) {
		this.model = _model;
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

	async findOne(
		conditions: FilterQuery<T>,
		projection?: any,
		options?: QueryOptions
	): Promise<T | null> {
		try {
			return await this.model
				.findOne(conditions, projection, options)
				.exec();
		} catch (error) {
			throw error;
		}
	}

	async find(
		conditions: FilterQuery<T>,
		projection?: any,
		options?: QueryOptions
	): Promise<T[]> {
		try {
			return await this.model
				.find(conditions, projection, options)
				.exec();
		} catch (error) {
			throw error;
		}
	}

	async updateOne(
		conditions: FilterQuery<T>,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<UpdateWriteOpResult> {
		try {
			const result = await this.model
				.updateOne(conditions, update, options)
				.exec();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async updateMany(
		conditions: FilterQuery<T>,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<UpdateWriteOpResult> {
		try {
			const result = await this.model
				.updateMany(conditions, update, options)
				.exec();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async countDocuments(
		conditions: FilterQuery<T>,
		options?: QueryOptions
	): Promise<number> {
		try {
			return await this.model.countDocuments(conditions, options).exec();
		} catch (error) {
			throw error;
		}
	}

	async deleteOne(
		conditions: FilterQuery<T>,
		options?: QueryOptions
	): Promise<{ deletedCount?: number }> {
		try {
			const result = await this.model
				.deleteOne(conditions, options)
				.exec();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async deleteMany(
		conditions: FilterQuery<T>,
		options?: QueryOptions
	): Promise<{ deletedCount?: number }> {
		try {
			const result = await this.model
				.deleteMany(conditions, options)
				.exec();
			return result;
		} catch (error) {
			throw error;
		}
	}

	async findOneAndUpdate(
		conditions: FilterQuery<T>,
		update: UpdateQuery<T>,
		options?: QueryOptions
	): Promise<T | null> {
		try {
			return await this.model
				.findOneAndUpdate(conditions, update, options)
				.exec();
		} catch (error) {
			throw error;
		}
	}

	async findOneAndDelete(
		conditions: FilterQuery<T>,
		options?: QueryOptions
	): Promise<T | null> {
		try {
			return await this.model
				.findOneAndDelete(conditions, options)
				.exec();
		} catch (error) {
			throw error;
		}
	}

	async findOneAndReplace(
		conditions: FilterQuery<T>,
		replacement: T,
		options?: QueryOptions
	): Promise<T | null> {
		try {
			return await this.model
				.findOneAndReplace(conditions, replacement, options)
				.exec();
		} catch (error) {
			throw error;
		}
	}

	async aggregate(pipeline: any[], options?: AggregateOptions): Promise<T[]> {
		try {
			return await this.model.aggregate(pipeline, options).exec();
		} catch (error) {
			throw error;
		}
	}
}
