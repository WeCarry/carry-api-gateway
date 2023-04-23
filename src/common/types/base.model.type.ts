import { Types } from 'mongoose';

export type BaseModel = {
	_id: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
} & Document;
