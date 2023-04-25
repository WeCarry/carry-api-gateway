import { Kafka, Producer, Consumer, KafkaConfig } from 'kafkajs';

class KafkaWrapper {
	private kafka: Kafka;
	private producer: Producer | null = null;
	private consumer: Consumer | null = null;

	constructor(config: KafkaConfig) {
		this.kafka = new Kafka(config);
	}

	async createProducer(): Promise<Producer> {
		this.producer = this.kafka.producer();
		await this.producer.connect();
		return this.producer;
	}

	async createConsumer(groupId: string): Promise<Consumer> {
		this.consumer = this.kafka.consumer({ groupId });
		await this.consumer.connect();
		return this.consumer;
	}

	async send(topic: string, message: string): Promise<void> {
		if (!this.producer) {
			await this.createProducer();
		}

		if (this.producer) {
			await this.producer.send({
				topic,
				messages: [{ value: message }],
			});
		} else {
			throw new Error('Failed to create Kafka producer');
		}
	}

	async subscribe(
		topic: string,
		onMessage: (message: string) => void
	): Promise<void> {
		if (!this.consumer) {
			throw new Error(
				'Consumer not initialized. Call createConsumer() first.'
			);
		}

		await this.consumer.subscribe({ topic });

		await this.consumer.run({
			eachMessage: async ({ message }) => {
				onMessage(message.value?.toString() || '');
			},
		});
	}
}

export default KafkaWrapper;
