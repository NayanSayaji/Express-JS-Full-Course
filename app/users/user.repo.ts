import { UserModel } from "./user.schema";

import { UserI } from "./user.types";

const find = async (query: Partial<UserI>) => await UserModel.find(query);

const findOne = async (query: Partial<UserI>) => await UserModel.findOne(query);

const insertOne = async (user: UserI) => await UserModel.create(user);

const insertMany = async (users: UserI[]) => await UserModel.insertMany(users);

const findOneAndUpdate = async (findQuery: Partial<UserI>, updateObj: Partial<UserI>) =>
	await UserModel.findOneAndUpdate(findQuery, updateObj);

export default {
	find,
	findOne,
	insertOne,
	insertMany,
	findOneAndUpdate,
};
