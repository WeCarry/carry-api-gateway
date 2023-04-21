import UsersDao from '../daos/users.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { IUser } from '../interfaces/user.interface';
import { ErrorHandler } from '../../error/basic.error';

class UsersService implements CRUD<IUser> {
	async create(resource: CreateUserDto) {
		return UsersDao.addUser(resource);
	}

	async deleteById(id: string) {
		return UsersDao.removeUserById(id);
	}

	async list(limit: number, page: number) {
		return UsersDao.getUsers();
	}

	async patchById(id: string, resource: PatchUserDto) {
		const result = await UsersDao.patchUserById(id, resource);
		if (result) {
			return result;
		} else {
			throw new ErrorHandler('User Not found', 404);
		}
	}

	async readById(id: string): Promise<IUser> {
		const result = await UsersDao.getUserById(id);
		if (result) {
			return result;
		} else {
			throw new ErrorHandler('User Not found', 404);
		}
	}

	async putById(id: string, resource: PutUserDto) {
		return UsersDao.putUserById(id, resource);
	}

	async getUserByEmail(email: string) {
		return UsersDao.getUserByEmail(email);
	}
}

export default new UsersService();
