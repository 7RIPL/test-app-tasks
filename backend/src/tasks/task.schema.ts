import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    dueDate: { type: Date },
    tags: { type: [String], default: [] }
});
