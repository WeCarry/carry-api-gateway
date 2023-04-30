import { Chat } from '../schemas/chat.schema';
import { Request, Response } from 'express';
import chatService from '../services/chat.service';

class ChatConrtoller {
	createChat = async (req: Request, res: Response) => {
		try {
			const chat = await chatService.createChat(req.body as any);
			res.status(201).json(chat);
		} catch (error) {
			res.status(500).json({ message: 'Error creating chat', error });
		}
	};

	getChats = async (req: Request, res: Response) => {
		try {
			const { senderId, recipientId } = (req as any).query;
			const chats: Chat[] = await chatService.getChats(
				senderId,
				recipientId
			);
			res.status(200).json(chats);
		} catch (error) {
			res.status(500).json({ message: 'Error fetching chats', error });
		}
	};
}

export default new ChatConrtoller();
