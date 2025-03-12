import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, HttpCode, Request, ForbiddenException, UnauthorizedException, NotFoundException, HttpException, InternalServerErrorException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './entities/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { Public } from 'src/auth/auth.constants';
import { Request as ExpressRequest } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(
    @Body() createTaskDto: CreateTaskDTO,
  ): Promise<{ success: boolean; contents?: CreateTaskDTO; error?: string }> {
    try {
      const contents = await this.tasksService.createTask(createTaskDto);
      console.log('task created:', contents);
      return {
        success: true,
        contents,
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
  @HttpCode(HttpStatus.OK)
  async getTasks(): Promise<{
    success: boolean;
    contents?: Tasks[];
    error?: string;
  }> {
    try {
      const contents = await this.tasksService.getTasks();
      console.log('tasks retrieved:', contents);
      return {
        success: true,
        contents,
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
  @HttpCode(HttpStatus.OK)
  async getTaskById(
    @Param('id') id: number,
  ): Promise<{ success: boolean; contents?: Tasks; error?: string }> {
    try {
      const contents = await this.tasksService.getTaskById(id);
      console.log(`task retrieved with id ${id}:`, contents);
      return {
        success: true,
        contents,
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
  @HttpCode(HttpStatus.OK)
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDTO,
    @Request() req: ExpressRequest,
  ): Promise<{ success: boolean; contents?: Tasks; error?: string }> {
    try {
      if (!req.user || !('sub' in req.user)) {
        throw new UnauthorizedException('user not authenticated');
      }

      const task = await this.tasksService.getTaskById(id);
      if (!task) {
        throw new NotFoundException('task not found');
      }

      if (req.user.sub !== task.creator_id) {
        throw new ForbiddenException('user not authorized to update this task');
      }

      const contents = await this.tasksService.updateTask(id, updateTaskDto);
      console.log(`Task updated with id ${id}:`, contents);

      return {
        success: true,
        contents,
      };
    } catch (error) {
      console.error(`error updating task with id ${id}:`, error.message);

      if (error instanceof HttpException) {
        throw error;
      }

      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(
    @Param('id') id: number,
  ): Promise<{ success: boolean; contents?: Tasks; error?: string }> {
    try {
      const contents = await this.tasksService.deleteTask(id);
      console.log(`task deleted with id ${id}:`, contents);
      return {
        success: true,
        contents,
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
