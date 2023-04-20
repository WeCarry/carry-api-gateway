// User schema
export const passengerSchema = {
	type: 'object',
	properties: {
		id: { type: 'string', format: 'uuid' },
		username: { type: 'string', minLength: 3, maxLength: 20 },
		firstName: { type: 'string', minLength: 1, maxLength: 20 },
		lastName: { type: 'string', minLength: 1, maxLength: 20 },
		email: { type: 'string', format: 'email' },
		password: { type: 'string', minLength: 8 },
		phone: { type: 'string', minLength: 10, maxLength: 15 },
		profilePicture: { type: 'string', format: 'uri' },
		paymentMethod: { type: 'string' },
		paymentHistory: {
			type: 'array',
			items: { type: 'object' },
		},
		rideHistory: {
			type: 'array',
			items: { type: 'object' },
		},
		deliveryHistory: {
			type: 'array',
			items: { type: 'object' },
		},
	},
	required: ['id', 'firstName', 'lastName', 'email', 'password'],
};
