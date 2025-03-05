import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':userId')
  async createTask(@Param('userId') userId: number, @Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.createTask(userId, taskData);
  }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }
}
