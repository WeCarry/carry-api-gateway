import { BaseDao } from '../../common/daos/base.dao';
import CardModel, { Card } from '../schemas/card.schema';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class CardDao extends BaseDao<Card> {
	constructor() {
		log('Created new instance of ', CardDao.prototype.constructor.name);
		super(CardModel);
	}
}

export default new CardDao();
