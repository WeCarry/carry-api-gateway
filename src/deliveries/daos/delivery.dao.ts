import { BaseDao } from '../../common/daos/base.dao';
import DeliveryModel, { Delivery } from '../schemas/delivery.schema';

class DeliveryDao extends BaseDao<Delivery> {
	constructor() {
		super(DeliveryModel);
	}
}

export default new DeliveryDao();
