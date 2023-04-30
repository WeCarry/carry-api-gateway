import Redis, { Redis as RedisClient, RedisOptions } from 'ioredis';

type SetOptions = {
	EX?: number;
	PX?: number;
	NX?: boolean;
	XX?: boolean;
	KEEPTTL?: boolean;
};

class RedisWrapper {
	private client: RedisClient;

	constructor(options: RedisOptions) {
		this.client = new Redis(options);
	}

	async set(key: string, value: string, options?: SetOptions): Promise<void> {
		const args: (string | number | boolean)[] = [key, value];

		if (options) {
			if (options.EX) {
				args.push('EX', options.EX);
			} else if (options.PX) {
				args.push('PX', options.PX);
			}

			if (options.NX) {
				args.push('NX');
			} else if (options.XX) {
				args.push('XX');
			}

			if (options.KEEPTTL) {
				args.push('KEEPTTL');
			}
		}

		await this.client.set(...(args as [string, string, ...any[]]));
	}

	async get(key: string): Promise<string | null> {
		return await this.client.get(key);
	}

	// For pub/sub functionality
	async subscribe(
		channel: string,
		onMessage: (channel: string, message: string) => void
	): Promise<void> {
		const pubSubClient = new Redis();
		await pubSubClient.subscribe(channel);
		pubSubClient.on('message', onMessage);
	}

	async publish(channel: string, message: string): Promise<void> {
		const pubSubClient = new Redis();
		await pubSubClient.publish(channel, message);
	}

	async disconnect(): Promise<void> {
		await this.client.quit();
	}
}

export default RedisWrapper;
