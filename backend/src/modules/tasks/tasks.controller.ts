import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './entities/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Public } from 'src/auth/auth.constants';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @Post(':userId')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(
    // @Param('userId') userId: number,
    @Body() createTaskDto: CreateTaskDTO,
  ): Promise<CreateTaskDTO> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Public()
  @Get()
  async getTasks(): Promise<{ success: boolean, data: Tasks[]}> {
    return {
      success: true,
      data: await this.tasksService.getTasks(),
    };
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<{ success: boolean, data: Tasks }> {
    return {
      success: true,
      data: await this.tasksService.getTaskById(id),
    };
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDTO,
  ): Promise<{ success: boolean, data: Tasks }> {
    return {
      success: true,
      data: await this.tasksService.updateTask(id, updateTaskDto),
    };
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<{ success: boolean, data: Tasks }> {
    return {
      success: true,
      data: await this.tasksService.deleteTask(id),
    };
  }
}
