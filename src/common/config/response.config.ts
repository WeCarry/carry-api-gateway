// TypeScript

interface ResponseData<T> {
	status: number;
	message: string;
	data?: T;
	error?: any;
}

export function toRes<T = any>(
	status: number,
	message: string,
	data?: T,
	error?: any
): ResponseData<T> {
	let response: ResponseData<T> = {
		status: status,
		message: message,
	};

	if (data) {
		response.data = data;
	}

	if (error) {
		response.error = error;
	}

	return response;
}

// Usage example:
// const response = createServerResponse(200, "Success", { user: { id: 1, name: "John Doe" } });
// console.log(response);
