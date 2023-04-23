import debug from 'debug';
import RouteModel, { Route } from '../schemas/route.schema';
import { Model } from 'mongoose';
import { BaseDao } from '../../common/daos/base.dao';

const log: debug.IDebugger = debug('app:in-memory-dao');

export class RoutesDao extends BaseDao<Route> {
	protected model: Model<Route>;

	constructor() {
		super();
		log('Created new instance of RoutesDao');
		this.model = RouteModel;
	}
}
