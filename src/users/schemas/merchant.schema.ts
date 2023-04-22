import { Document, Schema, model } from 'mongoose';

export interface Merchant extends Document {
	name: string;
	address: string;
	phoneNumber: string;
	rating: number;
}

export const merchantSchema = new Schema<Merchant>({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	rating: Number,
});
