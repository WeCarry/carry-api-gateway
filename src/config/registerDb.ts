import Container from 'typedi';
import { connectToDB } from '../shared/database';
import { TYPES } from './types';

export async function registerDB(): Promise<void> {
	const adapter = await connectToDB();
	Container.set(TYPES.MongoDBAdapter, adapter);
}
