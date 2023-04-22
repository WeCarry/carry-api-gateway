import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { Types } from 'mongoose';
import debug from 'debug';
import { CreateUserDto } from '../dto/create.user.dto';
import UserModel, { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

const log: debug.IDebugger = debug('app:in-memory-dao');

export class UsersDao {
	private User: Model<User & Document>;

	constructor() {
		log('Created new instance of UsersDao');
		this.User = UserModel;
	}

	public async addUser(userFields: CreateUserDto): Promise<Types.ObjectId> {
		try {
			const user = new this.User({
				...userFields,
			});
			const result = await user.save();
			return result._id;
		} catch (error) {
			throw error;
		}
	}

	public async getUserByEmail(email: string): Promise<User | undefined> {
		try {
			const result = await this.User.findOne({ email: email }).exec();
			return result ?? undefined;
		} catch (error) {
			throw error;
		}
	}

	public async getUserById(userId: string): Promise<User | undefined> {
		try {
			return (
				(await this.User.findOne({ _id: userId })
					.populate('User')
					.exec()) ?? undefined
			);
		} catch (error) {
			throw error;
		}
	}

	public async getUsers(limit = 25, page = 0): Promise<User[]> {
		try {
			return this.User.find()
				.limit(limit)
				.skip(limit * page)
				.exec();
		} catch (error) {
			throw error;
		}
	}

	public async updateUserById(
		userId: string,
		userFields: PatchUserDto | PutUserDto
	): Promise<User | undefined> {
		try {
			return (
				(await this.User.findOneAndUpdate(
					{ _id: new Types.ObjectId(userId) },
					{ $set: userFields },
					{ new: true }
				).exec()) ?? undefined
			);
		} catch (error) {
			throw error;
		}
	}

	public async removeUserById(
		userId: string
	): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
		return this.User.deleteOne({ _id: userId }).exec();
	}

	async getUserByEmailWithPassword(email: string): Promise<User | undefined> {
		return (
			(await this.User.findOne({ email: email })
				.select(['_id', 'password', 'userType', 'permissionFlag'])
				.exec()) ?? undefined
		);
	}
}

export default new UsersDao();
