import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    async findAll() {
        return this.tasksService.findAll();
    }

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
        return this.tasksService.update(id, updateTaskDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.tasksService.delete(id);
    }
}
