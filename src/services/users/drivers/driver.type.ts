import { User } from '../../utils/types/user.type';

export type Driver = User & {
	phone: string;
	profilePicture: string;
	vehicleType: string;
	vehicleDetails: string;
	licenseNumber: string;
	licenseExpiryDate: string;
	paymentMethod: string;
	paymentHistory: any[];
	rideHistory: any[];
	deliveryHistory: any[];
	rating: number;
	status: boolean;
	dob: Date;
};
