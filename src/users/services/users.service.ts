import UsersDao from '../daos/users.dao';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { User } from '../schemas/user.schema';
import { Types } from 'mongoose';

class UsersService {
	async create(resource: CreateUserDto): Promise<Types.ObjectId> {
		return UsersDao.addUser(resource);
	}

	async deleteById(
		id: string
	): Promise<{ ok?: number; n?: number } & { deletedCount?: number }> {
		return UsersDao.removeUserById(id);
	}

	async list(limit: number, page: number): Promise<User[]> {
		return UsersDao.getUsers(limit, page);
	}

	async patchById(
		id: string,
		resource: PatchUserDto
	): Promise<User | undefined> {
		return UsersDao.updateUserById(id, resource);
	}

	async readById(id: string): Promise<User | undefined> {
		return UsersDao.getUserById(id, { createdAt: 1, updatedAt: 1 });
	}

	async putById(id: string, resource: PutUserDto): Promise<User | undefined> {
		return UsersDao.updateUserById(id, resource);
	}

	async getUserByEmail(email: string): Promise<User | undefined> {
		return UsersDao.getUserByEmail(email);
	}

	async getUserByEmailWithPassword(email: string): Promise<User | undefined> {
		return UsersDao.getUserByEmailWithPassword(email);
	}
}

export default new UsersService();
