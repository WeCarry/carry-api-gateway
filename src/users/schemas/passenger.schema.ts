import { Schema } from 'mongoose';
import { Address } from './merchant.schema';

type FavouritePlace = {
	address: Address;
	name: string;
};

export type Passenger = {
	additionalInfo: {
		phoneNumber: string;
		rides: Schema.Types.ObjectId[];
		rating: number;
		favouritePlaces?: FavouritePlace[];
	};
};

export const passengerSchema = new Schema<Passenger>({
	additionalInfo: {
		phoneNumber: String,
		rides: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Ride',
			},
		],
		rating: Number,
	},
});
