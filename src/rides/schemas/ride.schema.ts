import { Document, Schema, model } from 'mongoose';

export interface Ride extends Document {
	driver: Schema.Types.ObjectId;
	passenger: Schema.Types.ObjectId;
	pickupLocation: {
		address: string;
		latitude: number;
		longitude: number;
	};
	dropoffLocation: {
		address: string;
		latitude: number;
		longitude: number;
	};
	fare: number;
	distance: number;
	duration: number;
	rating: number;
}

const rideSchema = new Schema<Ride>({
	driver: {
		type: Schema.Types.ObjectId,
		ref: 'Driver',
		required: true,
	},
	passenger: {
		type: Schema.Types.ObjectId,
		ref: 'Passenger',
		required: true,
	},
	pickupLocation: {
		address: {
			type: String,
			required: true,
		},
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		},
	},
	dropoffLocation: {
		address: {
			type: String,
			required: true,
		},
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		},
	},
	fare: {
		type: Number,
		required: true,
	},
	distance: {
		type: Number,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 0,
		max: 5,
	},
});

export const RideModel = model<Ride>('Ride', rideSchema);
