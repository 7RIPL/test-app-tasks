import { Document } from 'mongoose';

export interface Task extends Document {
    readonly title: string;
    readonly description: string;
    readonly createdAt: Date;
    readonly dueDate?: Date;
    readonly tags?: string[];
}

