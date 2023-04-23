import { BaseModel } from '../../common/types/base.model.type';

export type Delivery = BaseModel & {
	date: Date;
	time: string;
	address: string;
	status: 'Scheduled' | 'In Transit' | 'Delivered' | 'Cancelled';
	method: 'Shipping' | 'Courier' | 'In-Person Delivery';
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
