import { Router } from "express";

import { permit } from "../utils/authorizations";
import { ResponseHandler } from "../utils/response.handler";
import { Route } from "../routes/routes.types";

import userServices from "./user.services";

const router = Router();

router.get("/:id?", permit(["admin"]), async (req, res, next) => {
	try {
		const { id } = req.params;
		const params = id ? { _id: id } : {};
		const result = await userServices.find(params);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const data = req.body;
		const insertMethod = Array.isArray(data) ? "insertMany" : "insertOne";
		const result = await userServices[insertMethod](data);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.patch("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await userServices.findOneAndUpdate({ _id: id }, req.body);
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await userServices.deleteOne({ _id: id });
		res.send(new ResponseHandler(result));
	} catch (e) {
		next(e);
	}
});

export default new Route("/user", router);
