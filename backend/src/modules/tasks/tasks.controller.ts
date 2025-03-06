import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':userId')
  async createTask(
    @Param('userId') userId: number,
    @Body() taskData: Partial<Tasks>,
  ): Promise<Tasks> {
    return this.tasksService.createTask(userId, taskData);
  }

  @Get()
  async getAllTasks(): Promise<Tasks[]> {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  async getTask(): Promise<Tasks[]> {
    return this.tasksService.getTasks();
  }
}
