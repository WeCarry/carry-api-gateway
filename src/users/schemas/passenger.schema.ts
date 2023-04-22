import { Document, Schema, model } from 'mongoose';

export type Passenger = {
	phoneNumber: string;
	rides: Schema.Types.ObjectId[];
	rating: number;
};

export const passengerSchema = new Schema<Passenger>({
	phoneNumber: String,
	rides: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Ride',
		},
	],
	rating: Number,
});
