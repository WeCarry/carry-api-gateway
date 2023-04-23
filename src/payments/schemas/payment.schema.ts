import { Schema, Types, model } from 'mongoose';
import { BaseModel } from '../../common/types/base.model.type';
enum PaymentType {
	Ride = 'RIDE',
	Delivery = 'DELIVERY',
}

enum PaymentStatus {
	Paid = 'PAID',
	Unpaid = 'UNPAID',
	Processing = 'PROCESSING',
	Created = 'CREATED',
}
export enum Currency {
	USD,
	EUR,
	RUB,
	UZS,
}
export type BasePayment = {
	amount: number; // the total amount of the payment in the smallest currency unit (e.g. cents)
	currency: Currency; // the currency code (e.g. "USD", "EUR", "RUB", "UZS")
	serviceFee: number; // the fee charged by the service for the transaction in the smallest currency unit (e.g. cents)
	tip?: number; // an optional tip amount in the smallest currency unit (e.g. cents)
	date: Date; // the date and time when the payment was made
	type: PaymentType; // the type of service the payment is for (either "ride" or "delivery")
	userId: Types.ObjectId; // the unique identifier for the user who made the payment
	driverId?: Types.ObjectId; // the unique identifier for the driver or delivery person who received the payment (if applicable)
	orderId?: Types.ObjectId; // the unique identifier for the order or ride associated with the payment (if applicable)
	status: PaymentStatus;
};

export type Payment = BaseModel & BasePayment;

const PaymentSchema = new Schema<Payment>({
	amount: { type: Number, required: true },
	currency: { type: Number, enum: Currency, required: true },
	serviceFee: { type: Number, required: true },
	tip: { type: Number },
	date: { type: Date, required: true },
	type: { type: String, enum: ['ride', 'delivery'], required: true },
	userId: { type: Schema.Types.ObjectId, required: true },
	driverId: { type: Types.ObjectId },
	orderId: { type: Types.ObjectId },
	deletedAt: { type: Date, select: false },
});

const PaymentModel = model<Payment>('Payment', PaymentSchema);

export default PaymentModel;
