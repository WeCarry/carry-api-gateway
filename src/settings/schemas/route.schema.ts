import { Schema, model } from 'mongoose';
import { UserTypes } from '../../users/enums/user-types.enum';
import { BaseModel } from '../../common/types/base.model.type';
export enum HTTPMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
	ANY = 'ANY',
}
export type Route = BaseModel & {
	route: string[];
	hasAccess: UserTypes[];
	method: HTTPMethods;
};

const routeSchema = new Schema<Route>(
	{
		route: [{ tyep: String, required: true, unique: true }],
		hasAccess: [
			{
				type: String,
				enum: UserTypes,
				required: true,
			},
		],
		method: {
			type: String,
			enum: HTTPMethods,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const RouteModel = model<Route>('Route', routeSchema);

export default RouteModel;
