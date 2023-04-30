import { Types } from 'mongoose';
import { Chat } from '../schemas/chat.schema';
import chatDao from '../daos/chat.dao';

class ChatService {
	async createChat(chat: Chat): Promise<Types.ObjectId> {
		return await chatDao.createChat(chat);
	}

	async getChats(senderId: string, recipientId: string): Promise<Chat[]> {
		return await this.getChats(senderId, recipientId);
	}
}

export default new ChatService();
