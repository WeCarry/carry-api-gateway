import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { Types } from 'mongoose';
import debug from 'debug';
import { CreateUserDto } from '../dto/create.user.dto';
import UserModel, { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { BaseDao } from '../../common/daos/base.dao';
import { UserTypes } from '../enums/user-types.enum';

const log: debug.IDebugger = debug('app:in-memory-dao');

export class UsersDao extends BaseDao<User> {
	private User: Model<User>;

	constructor() {
		super(UserModel);
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

	public async getUserById(
		userId: string,
		select: Record<string, number>
	): Promise<User | undefined> {
		try {
			return (
				(await this.User.findOne({ _id: userId })
					// .populate('User')
					.select(select)
					.exec()) ?? undefined
			);
		} catch (error) {
			throw error;
		}
	}

	public async getDriverById(
		driverId: string,
		select: Record<string, number> = {}
	): Promise<User | undefined> {
		try {
			return (
				(await this.User.findOne({
					_id: this.toId(driverId),
					userType: UserTypes.Driver,
				})
					.select(select)
					.exec()) ?? undefined
			);
		} catch (error) {
			throw error;
		}
	}

	async getPassengerById(
		driverId: string,
		select: Record<string, number> = {}
	): Promise<User | undefined> {
		try {
			return (
				(await this.User.findOne({
					_id: this.toId(driverId),
					userType: UserTypes.Passenger,
				})
					.select(select)
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
		try {
			return await this.User.deleteOne({ _id: userId }).exec();
		} catch (error) {
			throw error;
		}
	}

	async getUserByEmailWithPassword(email: string): Promise<User | undefined> {
		try {
			return (
				(await this.User.findOne({ email: email })
					.select({
						_id: 1,
						password: 1,
						userType: 1,
						permissionFlags: 1,
						email: 1,
					})
					.exec()) ?? undefined
			);
		} catch (error) {
			throw error;
		}
	}
}

export default new UsersDao();
