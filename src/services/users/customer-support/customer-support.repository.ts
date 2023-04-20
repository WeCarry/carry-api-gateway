import { BaseRepository, MongoDBAdapter } from "carry-db-driver";
import { customerSupportSchema } from "./customer-support.schema";
import { CustomerSupport } from "./customer-support.type";

export class CustomerSupportRepository extends BaseRepository<CustomerSupport> {
	constructor(adapter: MongoDBAdapter) {
		super({
			adapter,
			collection: 'customerSupport',
			schema: customerSupportSchema,
		});
	}

	// You can add additional methods specific to CustomerServiceRepository here
}
