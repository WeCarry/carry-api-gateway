import { BaseDao } from '../../common/daos/base.dao';
import PaymentModel, { Payment } from '../schemas/payment.schema';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class PaymentsDao extends BaseDao<Payment> {
	constructor() {
		log('Created new instance of ', PaymentsDao.prototype.constructor.name);
		super(PaymentModel);
	}
}

export default new PaymentsDao();
