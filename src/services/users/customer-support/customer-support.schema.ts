export const customerSupportSchema = {
	type: "object",
	properties: {
	  id: { type: "string" },
	  firstName: { type: 'string', minLength: 1, maxLength: 20 },
	  lastName: { type: 'string', minLength: 1, maxLength: 20 },
	  email: { type: "string", format: "email" },
	  password: { type: "string", minLength: 6 },
	  phone: { type: "string", minLength: 10, maxLength: 15 },
	},
	required: ["fullName", "email", "password", "phone"],
	additionalProperties: false,
  };
