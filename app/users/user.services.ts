import userRepo from "./user.repo";

import { UserI, UserDocument } from "./user.types";
import { userResponses } from "./user.repsonse";

const find = async (query: Partial<UserI>) => await userRepo.find(query);

async function findOne(query: Partial<UserI>, safe?: false): Promise<UserDocument>;
async function findOne(query: Partial<UserI>, safe?: true): Promise<UserDocument | false>;
async function findOne(query: Partial<UserI>, safe: boolean = false) {
	const result = await userRepo.findOne(query);

	if (!result) {
		if (safe) return false;
		throw userResponses.USER_NOT_FOUND;
	}

	return result as UserDocument;
}

const insertOne = async (data: UserI) => {
	try {
		const result = await userRepo.insertOne(data);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw userResponses.INSERT_FAILED;
		throw userResponses.SERVER_ERR;
	}
};

const insertMany = async (data: UserI[]) => {
	try {
		const result = await userRepo.insertMany(data);
		return result;
	} catch (error: any) {
		if (error.statusCode) throw userResponses.INSERT_FAILED;
		throw userResponses.SERVER_ERR;
	}
};

const findOneAndUpdate = async (findQuery: Partial<UserI>, updateObj: Partial<UserI>) => {
	try {
		const result = await userRepo.findOneAndUpdate(findQuery, updateObj);
		return userResponses.UPDATE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw userResponses.UPDATE_FAILED;
		throw userResponses.SERVER_ERR;
	}
};

const deleteOne = async (query: Partial<UserI>) => {
	try {
		const result = await userRepo.findOneAndUpdate(query, { isDeleted: true });
		return userResponses.DELETE_SUCCESSFUL;
	} catch (error: any) {
		if (error.statusCode) throw userResponses.DELETE_FAILED;
		throw userResponses.SERVER_ERR;
	}
};

export default {
	find,
	findOne,
	insertOne,
	insertMany,
	findOneAndUpdate,
	deleteOne,
};
