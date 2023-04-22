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

	public async addUser(
		userFields: CreateUserDto
	): Promise<Types.ObjectId | undefined> {
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

	public async getUserByEmail(
		email: string
	): Promise<(User & Document) | null> {
		return this.User.findOne({ email: email }).exec();
	}

	public async getUserById(
		userId: string
	): Promise<(User & Document) | null> {
		return this.User.findOne({ _id: userId }).populate('User').exec();
	}

	public async getUsers(
		limit = 25,
		page = 0
	): Promise<Array<User & Document>> {
		return this.User.find()
			.limit(limit)
			.skip(limit * page)
			.exec();
	}

	public async updateUserById(
		userId: string,
		userFields: PatchUserDto | PutUserDto
	): Promise<(User & Document) | null> {
		const existingUser = await this.User.findOneAndUpdate(
			{ _id: new Types.ObjectId(userId) },
			{ $set: userFields },
			{ new: true }
		).exec();

		return existingUser;
	}

	public async removeUserById(
		userId: string
	): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
		return this.User.deleteOne({ _id: userId }).exec();
	}
}

export default new UsersDao();
