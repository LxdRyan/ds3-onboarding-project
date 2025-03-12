import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './entities/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Public } from 'src/auth/auth.constants';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(
    @Body() createTaskDto: CreateTaskDTO,
  ): Promise<{ success: boolean, contents?: CreateTaskDTO, error?: string }> {
    try {
      const task = await this.tasksService.createTask(createTaskDto);
      console.log('task created:', task);
      return {
        success: true,
        contents: task,
      };
    } catch (error) {
      console.error('error creating task:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Public()
  @Get()
  async getTasks(): Promise<{ success: boolean, contents?: Tasks[], error?: string }> {
    try {
      const tasks = await this.tasksService.getTasks();
      console.log('tasks retrieved:', tasks);
      return {
        success: true,
        contents: tasks,
      };
    } catch (error) {
      console.error('error retrieving tasks:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<{ success: boolean, contents?: Tasks, error?: string }> {
    try {
      const task = await this.tasksService.getTaskById(id);
      console.log(`task retrieved with id ${id}:`, task);
      return {
        success: true,
        contents: task,
      };
    } catch (error) {
      console.error(`error retrieving task with id ${id}:`, error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDTO,
  ): Promise<{ success: boolean, contents?: Tasks, error?: string }> {
    try {
      const task = await this.tasksService.updateTask(id, updateTaskDto);
      console.log(`task updated with id ${id}:`, task);
      return {
        success: true,
        contents: task,
      };
    } catch (error) {
      console.error(`error updating task with id ${id}:`, error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<{ success: boolean, contents?: Tasks, error?: string }> {
    try {
      const task = await this.tasksService.deleteTask(id);
      console.log(`task deleted with id ${id}:`, task);
      return {
        success: true,
        contents: task,
      };
    } catch (error) {
      console.error(`error deleting task with id ${id}:`, error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
