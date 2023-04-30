export class ErrorHandlerServer extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number = 0) {
		super(message);
		this.statusCode = statusCode;
		Object.setPrototypeOf(this, ErrorHandlerServer.prototype);
	}
}
