import { Types } from 'mongoose';
import { BaseDao } from '../../common/daos/base.dao';
import ChatModel, { Chat } from '../schemas/chat.schema';

class ChatDao extends BaseDao<Chat> {
	constructor() {
		super(ChatModel);
	}

	async createChat(chat: Chat): Promise<Types.ObjectId> {
		return this.create(chat);
	}

	async getChats(senderId: string, recipientId: string): Promise<Chat[]> {
		return this.find({
			$or: [
				{ senderId, recipientId },
				{ senderId: recipientId, recipientId: senderId },
			],
		});
	}
}

export default new ChatDao();
