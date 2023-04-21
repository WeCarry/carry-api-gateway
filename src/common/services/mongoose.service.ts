import mongoose from 'mongoose';
import debug from 'debug';
import dotenv from 'dotenv';
dotenv.config();
const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
	private count = 0;
	private mongooseOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000,
	};

	constructor() {
		// this.connectWithRetry();
	}

	getMongoose() {
		return mongoose;
	}

	connectWithRetry = () => {
		return new Promise((resolve, reject) => {
			log('Attempting MongoDB connection (will retry if needed)');

			const uri =
				process.env.ENV === 'dev'
					? process.env.MONGO_DEV
					: process.env.MAIN_DB_URL;

			if (uri) {
				mongoose
					.connect(uri, this.mongooseOptions)
					.then(() => {
						console.log('Connected to MongoDB :)');
						log('MongoDB is connected');
						resolve('MongoDB is connected');
					})
					.catch((err) => {
						const retrySeconds = 5;
						log(
							`MongoDB connection unsuccessful (will retry #${++this
								.count} after ${retrySeconds} seconds):`,
							err
						);
						setTimeout(this.connectWithRetry, retrySeconds * 1000);
					});
			} else {
				console.log('Connection string is missing');
				log('Connection string is missing');
				reject();
			}
		});
	};

	// Add the disconnect method
	async disconnect() {
		try {
			await this.getMongoose().disconnect();
			log('MongoDB disconnected :(');
		} catch (err) {
			log('Error disconnecting MongoDB:', err);
		}
	}
}
export default new MongooseService();
