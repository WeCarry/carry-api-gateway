import { Schema, model } from 'mongoose';
import { BaseModel } from '../../common/types/base.model.type';

export type Gps = BaseModel & {
	deviceId: string;
	latitude: number;
	longitude: number;
	speed: number;
	altitude: number;
	timestamp: Date;
};

// const gpsSchema = new Schema<Gps>(
// 	{
// 		deviceId: { type: String, required: true },
// 		latitude: { type: Number, required: true },
// 		longitude: { type: Number, required: true },
// 		speed: { type: Number, required: true },
// 		altitude: { type: Number, required: true },
// 		timestamp: { type: Date, required: true },
// 	},
// 	{ timestamps: true }
// );

// const GPSModel = model<Gps>('Gps', gpsSchema);
