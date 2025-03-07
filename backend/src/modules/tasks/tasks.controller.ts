import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './entities/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':userId')
  async createTask(
    @Param('userId') userId: number,
    @Body() createTaskDto: CreateTaskDTO,
  ): Promise<Tasks> {
    return this.tasksService.createTask(userId, createTaskDto);
  }

  @Get()
  async getTasks(): Promise<Tasks[]> {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Tasks> {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDTO,
  ): Promise<Tasks> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }
}
