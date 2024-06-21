import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task} from "./task.interface";


@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async update(id: string, updateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
