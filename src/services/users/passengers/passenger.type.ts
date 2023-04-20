import { User } from '../../utils/types/user.type';

// Passenger type
export type Passenger = User & {
	phone: string;
	profilePicture?: string;
	paymentMethod?: string;
	paymentHistory?: Array<any>;
	rideHistory?: Array<any>;
	deliveryHistory?: Array<any>;
};

export { User };
