import { Schema, model } from 'mongoose';
import { BaseModel } from '../../common/types/base.model.type';

export type Payment = BaseModel & {
	amount: number; // the total amount of the payment in the smallest currency unit (e.g. cents)
	currency: string; // the currency code (e.g. "USD", "EUR", "RUB")
	serviceFee: number; // the fee charged by the service for the transaction in the smallest currency unit (e.g. cents)
	tip?: number; // an optional tip amount in the smallest currency unit (e.g. cents)
	date: Date; // the date and time when the payment was made
	type: 'ride' | 'delivery'; // the type of service the payment is for (either "ride" or "delivery")
	userId: number; // the unique identifier for the user who made the payment
	driverId?: number; // the unique identifier for the driver or delivery person who received the payment (if applicable)
	orderId?: number; // the unique identifier for the order or ride associated with the payment (if applicable)
};

const PaymentSchema = new Schema<Payment>({
	amount: { type: Number, required: true },
	currency: { type: String, required: true },
	serviceFee: { type: Number, required: true },
	tip: { type: Number },
	date: { type: Date, required: true },
	type: { type: String, enum: ['ride', 'delivery'], required: true },
	userId: { type: Number, required: true },
	driverId: { type: Number },
	orderId: { type: Number },
});

const PaymentModel = model<Payment>('Payment', PaymentSchema);

export default PaymentModel;
