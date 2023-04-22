import { Document, Schema, model } from 'mongoose';

export interface Passenger extends Document {
	phoneNumber: string;
	rides: Schema.Types.ObjectId[];
	rating: number;
}

export const passengerSchema = new Schema<Passenger>({
	phoneNumber: {
		type: String,
		required: true,
	},
	rides: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Ride',
		},
	],
	rating: Number,
});
