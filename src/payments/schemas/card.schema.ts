import { Schema, Types, model } from 'mongoose';
import { BaseModel } from '../../common/types/base.model.type';

export type Card = BaseModel & {
	userId: Types.ObjectId;
	expire: string;
	number: number;
	token: string;
};

const cardSchema = new Schema<Card>({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	expire: {
		type: String,
		required: true,
	},
	number: {
		type: Number,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	deletedAt: {
		type: Date,
		select: false,
	},
});

const CardModel = model<Card>('Card', cardSchema);

export default CardModel;
