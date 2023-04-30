import { Schema, model } from 'mongoose';

export type Chat = {
	senderId: string;
	recipientId: string;
	message: string;
};

const chatSchema = new Schema<Chat>(
	{
		senderId: { type: String, required: true },
		recipientId: { type: String, required: true },
		message: { type: String, required: true },
	},
	{ timestamps: true }
);

const ChatModel = model<Chat>('Chat', chatSchema);

export default ChatModel;
