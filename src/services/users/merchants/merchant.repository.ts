import { BaseRepository, MongoDBAdapter } from 'carry-db-driver';
import { Merchant } from './merchant.type';

export class MerchantRepository extends BaseRepository<Merchant> {
	constructor(adapter: MongoDBAdapter) {
		super({ adapter, collection: 'merchants', schema: merchantSchema });
	}

	// You can add additional methods specific to MerchantRepository here
}
