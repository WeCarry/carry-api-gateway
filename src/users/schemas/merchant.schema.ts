import { Document, Schema } from 'mongoose';

export type Address = {
	street: string;
	city: string;
	region: string;
	zip: string;
	country: string;
	coords: {
		lat: number;
		long: number;
	};
};
export type Merchant = {
	additionalInfo: {
		name: string;
		address: Address;
		phoneNumber: string;
		rating: number;
	};
};

export const merchantSchema = new Schema<Merchant>({
	additionalInfo: {
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
	},
});
