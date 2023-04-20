// BaseRepositoryWrapper.ts
import { MongoDBAdapter } from 'carry-db-driver';
import { BaseRepository } from 'carry-db-driver';
import { injectable } from 'inversify';
import { Document } from 'mongodb';
type Settings = {
	adapter: MongoDBAdapter;
	collection: string;
	schema?: object;
};
@injectable()
export abstract class BaseRepositoryWrapper<T extends Document> extends BaseRepository<T> {
	constructor(config: Settings) {
		super(config);
	}
}
