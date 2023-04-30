import { Schema, model } from 'mongoose';
import { BaseModel } from '../../common/types/base.model.type';

enum DeliveryStatuses {
	Scheduled = 'SCHEDULED',
	InTransit = 'IN_TRANSIT',
	Delivered = 'DELIVERED',
	Cancelled = 'CANCELLED',
}
enum DeliveryMethods {
	Shipping = 'SHIPPING',
	Courier = 'COURIER',
	InPersonDelivery = 'IN_PERSON_DELIVERY',
}

export type Delivery = BaseModel & {
	date: Date;
	time: string;
	address: string;
	status: DeliveryStatuses;
	method: DeliveryMethods;
	cost?: number;
	items: Array<{
		name: string;
		quantity: number;
		price: number;
	}>;
	instructions?: string;
	confirmation?: {
		date: Date;
		time: string;
		recipient: string;
		signature?: string;
	};
};

const DeliverySchema = new Schema<Delivery>(
	{
		date: { type: Date, required: true },
		time: { type: String, required: true },
		address: { type: String, required: true },
		status: {
			type: String,
			enum: Object.values(DeliveryStatuses),
			required: true,
		},
		method: {
			type: String,
			enum: Object.values(DeliveryMethods),
			required: true,
		},
		cost: { type: Number },
		items: [
			{
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				price: { type: Number, required: true },
			},
		],
		instructions: { type: String },
		confirmation: {
			date: { type: Date },
			time: { type: String },
			recipient: { type: String },
			signature: { type: String },
		},
	},
	{ timestamps: true }
);

const DeliveryModel = model<Delivery>('Delivery', DeliverySchema);

export default DeliveryModel;
