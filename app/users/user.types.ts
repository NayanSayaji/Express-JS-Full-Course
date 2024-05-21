import z, { string } from 'zod';
import { Document } from 'mongoose';
import { ZBase } from '../utils/base-schema';

export interface UserResponsesI {
	[key: string]: {
		statusCode: number;
		message: string;
	};
}

export const UserSchema = ZBase.extend({
    username: z.string(),
    password: z.string()
})

export interface UserI extends z.infer<typeof UserSchema>{};
export type UserDocument = Document & UserI