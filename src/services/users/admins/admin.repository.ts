import { BaseRepository, MongoDBAdapter } from "carry-db-driver";
import { Admin } from "mongodb";
import { adminSchema } from "./admin.schema";

export class AdminRepository extends BaseRepository<Admin> {
	constructor(adapter: MongoDBAdapter) {
		super({ adapter, collection: 'admins', schema: adminSchema });
	}

	// You can add additional methods specific to AdminRepository here
}
