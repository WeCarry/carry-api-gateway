import { Schema, model } from 'mongoose';
import { BaseModel } from '../../common/types/base.model.type';

export enum RideStatus {
	Completed = 'COMPLETED',
	InProgress = 'IN_PROGRESS',
	NotStarted = 'NOT_STARTED',
}

export type BaseRide = {
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
	status: RideStatus;
};

export type Ride = BaseRide & BaseModel;

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
