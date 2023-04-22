import { Document, Schema } from 'mongoose';

export interface Address {
	street: string;
	city: string;
	region: string;
	zip: string;
	country: string;
}
export interface Merchant extends Document {
	name: string;
	address: Address;
	phoneNumber: string;
	rating: number;
}

export const merchantSchema = new Schema<Merchant>({
	name: {
		type: String,
		required: true,
	},
	address: {
		street: String,
		city: String,
		region: String,
		zip: String,
		country: String,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	rating: Number,
});
