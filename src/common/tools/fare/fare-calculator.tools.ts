import * as tf from '@tensorflow/tfjs';
// fareCalculator.ts
export interface FareSettings {
	baseFare: number;
	costPerMinute: number;
	costPerKilometer: number;
	minimumFare: number;
	currency: string;
}

export class FareCalculator {
	private fareSettings: FareSettings;
	private model: tf.Sequential | undefined;

	constructor(fareSettings: FareSettings) {
		this.fareSettings = fareSettings;
	}

	calculateFare(distance: number, duration: number): number {
		const distanceFare = distance * this.fareSettings.costPerKilometer;
		const timeFare = duration * this.fareSettings.costPerMinute;
		const totalFare = this.fareSettings.baseFare + distanceFare + timeFare;

		return Math.max(totalFare, this.fareSettings.minimumFare);
	}

	formatFare(fare: number): string {
		return `${this.fareSettings.currency}${fare.toFixed(2)}`;
	}

	private async createModel(): Promise<tf.Sequential> {
		const model = tf.sequential();

		model.add(tf.layers.dense({ inputShape: [3], units: 1 }));

		model.compile({
			loss: 'meanSquaredError',
			optimizer: 'sgd',
		});

		return model;
	}

	async trainModel(data: number[][], labels: number[]): Promise<void> {
		const model = await this.createModel();

		const xs = tf.tensor2d(data);
		const ys = tf.tensor2d(labels, [labels.length, 1]);

		await model.fit(xs, ys, {
			batchSize: 32,
			epochs: 50,
		});

		this.model = model;
	}

	async calculateFareWithModel(
		distance: number,
		duration: number,
		timeOfDay: number
	): Promise<number> {
		if (!this.model) {
			throw new Error('Model is not trained yet.');
		}

		const input = tf.tensor2d([[distance, duration, timeOfDay]]);
		const prediction = this.model.predict(input) as tf.Tensor;

		const predictedFare = prediction.dataSync()[0];
		return Math.max(predictedFare, this.fareSettings.minimumFare);
	}
}
