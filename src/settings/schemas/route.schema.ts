import { Schema, Types, model } from 'mongoose';
import { UserTypes } from '../../users/enums/user-types.enum';

export type Route = {
	_id: Types.ObjectId;
	route: string[];
	hasAccess: UserTypes[];
} & Document;

const routeSchema = new Schema<Route>(
	{
		route: [{ tyep: String, required: true }],
		hasAccess: [
			{
				type: String,
				enum: UserTypes,
				required: true,
			},
		],
	},
	{
		timestamps: true,
	}
);

const RouteModel = model<Route>('Route', routeSchema);

export default RouteModel;
