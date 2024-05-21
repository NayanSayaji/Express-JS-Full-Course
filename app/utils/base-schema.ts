import mongoose, { Schema, SchemaDefinitionProperty } from "mongoose";
import { z } from "zod";

export class BaseSchema extends Schema {
    constructor(schema: { [key: string]: SchemaDefinitionProperty }) {
        super({
            ...schema,
            isDeleted : {
                type:Boolean,
                require:true,
                default:false
            },
            createdAt : {
                type:Date,
                default:Date.now()
            },
            updatedAt : {
                type:Date,
                default:Date.now()
            },
            createdBy : {
                type: mongoose.Types.ObjectId,
            }
        },{timestamps:true});
    }
}

export const ZBase = z.object({
	_id: z.string().optional(),
	isDeleted: z.boolean().optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});
