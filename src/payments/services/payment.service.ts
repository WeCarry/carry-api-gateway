import axios from 'axios';
import { Card } from '../schemas/card.schema';

type CardCreateResponse = {
	card: {
		number: string;
		expire: string;
		token: string;
		recurrent: boolean;
		verify: boolean;
	};
};

type GetVerifyCodeResponse = {
	sent: boolean;
	phone: string;
	wait: number;
};

type VerifyCardResponse = {
	card: {
		number: string;
		expire: string;
		token: string;
		recurrent: boolean;
		verify: boolean;
	};
};

type CardCheckParams = {
	token: string;
};

type CardCheckResult = {
	card: {
		number: string;
		expire: string;
		token: string;
		recurrent: boolean;
		verify: boolean;
	};
};

type CardRemoveResponse = {
	success: boolean;
};

class PaymentService {
	private readonly API_URL = process.env.API_URL!;
	private readonly X_AUTH_TOKEN = process.env.X_AUTH_TOKEN!;

	async createCard(
		card: Card,
		save: boolean,
		id: string
	): Promise<CardCreateResponse> {
		const requestData = {
			id, // replace with your own unique ID
			method: 'cards.create',
			params: {
				card,
				save,
			},
		};

		const response = await axios.post(this.API_URL, requestData, {
			headers: {
				'X-Auth': this.X_AUTH_TOKEN,
			},
		});

		return response.data.result as CardCreateResponse;
	}

	async getVerifyCode(
		token: string,
		id: string
	): Promise<GetVerifyCodeResponse> {
		const requestData = {
			id, // replace with your own unique ID
			method: 'cards.get_verify_code',
			params: {
				token,
			},
		};

		const response = await axios.post(this.API_URL, requestData, {
			headers: {
				'X-Auth': this.X_AUTH_TOKEN,
			},
		});

		return response.data.result as GetVerifyCodeResponse;
	}

	async verifyCard(
		token: string,
		code: string,
		id: string
	): Promise<VerifyCardResponse> {
		const requestData = {
			id, // replace with your own unique ID
			method: 'cards.verify',
			params: {
				token,
				code,
			},
		};

		const response = await axios.post(this.API_URL, requestData, {
			headers: {
				'X-Auth': this.X_AUTH_TOKEN,
			},
		});

		return response.data.result as VerifyCardResponse;
	}
	async checkCard(token: string, id: string): Promise<CardCheckResult> {
		const requestData = {
			id, // replace with your own unique ID
			method: 'cards.check',
			params: {
				token,
			},
		};

		const response = await axios.post(this.API_URL, requestData, {
			headers: {
				'X-Auth': this.X_AUTH_TOKEN,
			},
		});

		return response.data.result as CardCheckResult;
	}

	async removeCard(token: string, id: string): Promise<CardRemoveResponse> {
		const requestData = {
			id, // replace with your own unique ID
			method: 'cards.remove',
			params: {
				token,
			},
		};

		const response = await axios.post(this.API_URL, requestData, {
			headers: {
				'X-Auth': this.X_AUTH_TOKEN,
			},
		});

		return response.data.result as CardRemoveResponse;
	}
}

export default new PaymentService();
