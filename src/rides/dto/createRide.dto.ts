export type CreateRideDto = {
	driver: string;
	passenger: string;
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
	createdAt: string;
	updatedAt: string
};
