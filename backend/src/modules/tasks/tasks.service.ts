import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTask(userId: number, taskData: Partial<Task>): Promise<Task> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('user not found');
      }

      const task = this.taskRepository.create({ ...taskData, creator: user });
      return this.taskRepository.save(task);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('database connection refused');
      }
      throw error;
    }
  }

  async getTasks(): Promise<Task[]> {
    try {
      return this.taskRepository.find({ relations: ['creator'] });
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error('database connection refused');
      }
      throw error;
    }
  }
}
