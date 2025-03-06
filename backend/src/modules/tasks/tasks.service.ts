import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './entities/task.entity';
import { Users } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly taskRepository: Repository<Tasks>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createTask(userId: number, taskData: Partial<Tasks>): Promise<Tasks> {
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

  async getTasks(): Promise<Tasks[]> {
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
