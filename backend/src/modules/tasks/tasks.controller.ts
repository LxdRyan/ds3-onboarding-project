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
}
