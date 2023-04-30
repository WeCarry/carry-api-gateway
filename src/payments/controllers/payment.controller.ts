import express from 'express';
import { toRes } from '../../common/config/response.config';
import paymentService from '../services/payment.service';

class PaymentController {
	async createCard(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		try {
			const { card, save, id } = req.body;
			const response = await paymentService.createCard(card, save, id);
			res.status(201).send(toRes(201, 'Success', response));
		} catch (error) {
			res.status(500).send(toRes<string>(500, 'Error', undefined, error));
		}
	}

	async getVerifyCode(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		try {
			const { token, id } = req.body;
			const response = await paymentService.getVerifyCode(token, id);
			res.status(200).send(toRes(200, 'Success', response));
		} catch (error) {
			res.status(500).send(toRes<string>(500, 'Error', undefined, error));
		}
	}

	async verifyCard(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		try {
			const { token, code, id } = req.body;
			const response = await paymentService.verifyCard(token, code, id);
			res.status(200).send(toRes(200, 'Success', response));
		} catch (error) {
			res.status(500).send(toRes<string>(500, 'Error', undefined, error));
		}
	}

	async checkCard(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		try {
			const { token, id } = req.body;
			const response = await paymentService.checkCard(token, id);
			res.status(200).send(toRes(200, 'Success', response));
		} catch (error) {
			res.status(500).send(toRes<string>(500, 'Error', undefined, error));
		}
	}

	async removeCard(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		try {
			const { token, id } = req.body;
			const response = await paymentService.removeCard(token, id);
			res.status(200).send(toRes(200, 'Success', response));
		} catch (error) {
			res.status(500).send(toRes<string>(500, 'Error', undefined, error));
		}
	}
}

export default new PaymentController();
