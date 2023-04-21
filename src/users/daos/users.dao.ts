import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import shortid from 'shortid';
import debug from 'debug';
import { IUser } from '../interfaces/user.interface';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
	users: Array<CreateUserDto> = [];

	constructor() {
		log('Created new instance of UsersDao');
	}

	async addUser(user: CreateUserDto): Promise<IUser> {
		user.id = shortid.generate();
		this.users.push(user);
		return user;
	}

	async getUsers(): Promise<IUser[]> {
		return this.users;
	}

	async getUserById(userId: string): Promise<IUser | undefined> {
		return this.users.find((user: { id: string }) => user.id === userId);
	}

	async putUserById(userId: string, user: PutUserDto): Promise<IUser> {
		const objIndex = this.users.findIndex(
			(obj: { id: string }) => obj.id === userId
		);
		this.users.splice(objIndex, 1, user);
		return user;
	}

	async patchUserById(userId: string, user: PatchUserDto): Promise<IUser | undefined> {
		const objIndex = this.users.findIndex(
			(obj: { id: string }) => obj.id === userId
		);
		let currentUser = this.users[objIndex];
		const allowedPatchFields = [
			'password',
			'firstName',
			'lastName',
			'permissionLevel',
		];
		for (let field of allowedPatchFields) {
			if (field in user) {
				// @ts-ignore
				currentUser[field] = user[field];
			}
		}
		this.users.splice(objIndex, 1, currentUser);
		const res = this.users.find(i => i.id === userId);
		return res;
	}

	async removeUserById(userId: string): Promise<string> {
		const objIndex = this.users.findIndex(
			(obj: { id: string }) => obj.id === userId
		);
		this.users.splice(objIndex, 1);
		return `${userId} removed`;
	}

	async getUserByEmail(email: string) {
		const objIndex = this.users.findIndex(
			(obj: { email: string }) => obj.email === email
		);
		let currentUser = this.users[objIndex];
		if (currentUser) {
			return currentUser;
		} else {
			return null;
		}
	}
}

export default new UsersDao();
