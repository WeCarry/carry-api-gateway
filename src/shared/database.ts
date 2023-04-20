import { Database, MongoDBAdapter } from 'carry-db-driver';
import { ErrorHandler } from '../error/basic.error';

// export class DatabaseConnection extends Database {
// 	constructor() {
// 		super({
// 			dbName: 'myDb',
// 			url: process.env.MAIN_DB_URL!,
// 		});
// 	}
// }
const DB_URL =
	'mongodb+srv://carry-main:qVwON1lL2Wl5Wj1S@main.zp05kok.mongodb.net/?retryWrites=true&w=majority';
const DB_NAME = 'main';

export async function connectToDB(): Promise<MongoDBAdapter> {
	if (DB_NAME && DB_URL) {
		try {
			const connection = new Database({ dbName: DB_NAME, url: DB_URL });
			await connection.connect();

			return connection.getAdapter();
		} catch (error) {
			console.log(
				`Db connection failed: DB_NAME: ${DB_NAME}, DB_URL: ${DB_URL} => ${error}`
			);

			throw new ErrorHandler(
				`Db connection failed: DB_NAME: ${DB_NAME}, DB_URL: ${DB_URL} => ${error}`,
				502
			);
		}
	} else {
		throw new ErrorHandler(`DB_NAME: ${DB_NAME}, DB_URL: ${DB_URL}`, 502);
	}
}
