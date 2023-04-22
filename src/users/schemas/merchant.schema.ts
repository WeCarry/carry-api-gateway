import { Document, Schema } from 'mongoose';

export type Address = {
	street: string;
	city: string;
	region: string;
	zip: string;
	country: string;
};
export type Merchant = {
	name: string;
	address: Address;
	phoneNumber: string;
	rating: number;
};

export const merchantSchema = new Schema<Merchant>({
	name: String,
	address: {
		street: String,
		city: String,
		region: String,
		zip: String,
		country: String,
	},
	phoneNumber: String,
	rating: Number,
});
