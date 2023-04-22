import { Schema } from 'mongoose';
import { Ride } from '../../rides/schemas/ride.schema';

export enum DriverStatuses {
	Active = 'ACTIVE',
	Busy = 'BUSY',
	Inactive = 'INACTIVE',
}

export type Driver = {
	licenseNumber: string;
	vehicle: {
		make: string;
		model: string;
		year: number;
		photos: string[];
		registration: {
			plateNumber: string;
			expirationDate: Date;
		};
		insurance: {
			policyNumber: string;
			expirationDate: Date;
		};
	};
	rides: Schema.Types.ObjectId[] | Ride[];
	status: DriverStatuses;
	rating: number;
	age: number;
};

export const driverSchema = new Schema<Driver>({
	licenseNumber: String,
	vehicle: {
		make: String,
		model: String,
		year: Number,
		photos: [
			{
				type: String,
			},
		],
		registration: {
			plateNumber: String,
			expirationDate: Date,
		},
		insurance: {
			policyNumber: String,
			expirationDate: Date,
		},
	},
	rides: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Ride',
		},
	],
	rating: Number,
	status: {
		type: String,
		enum: DriverStatuses,
	},
	age: Number,
});
