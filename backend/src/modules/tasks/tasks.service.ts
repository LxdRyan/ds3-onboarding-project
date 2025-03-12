import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './entities/task.entity';
import { Users } from '../users/entities/user.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createTask(createTaskDto: CreateTaskDTO): Promise<Tasks> {
    try {
      const task = this.taskRepository.create(createTaskDto);
      await this.taskRepository.save(task);
      return task;
    } catch (error) {
      throw error;
    }
  }

  async getTasks(): Promise<Tasks[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Tasks> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('task not found');
    }
    return task;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDTO): Promise<Tasks> {
    const taskData = updateTaskDto;
    await this.taskRepository.update(id, { ...taskData });
    
    const updatedTask = await this.taskRepository.findOne({ where: { id } });
    if (!updatedTask) {
      throw new Error('task not found');
    }
    return updatedTask;
  }

  async deleteTask(id: number): Promise<Tasks> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('task not found');
    }
    await this.taskRepository.delete(id);
    return task;
  }
}
