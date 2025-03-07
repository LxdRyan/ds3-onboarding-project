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

  async createTask(userId: number, createTaskDto: CreateTaskDTO): Promise<Tasks> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('user not found');
    }

    const task = this.taskRepository.create({ ...createTaskDto, creator_id: user.id });
    return this.taskRepository.save(task);
  }

  async getTasks(): Promise<Tasks[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Tasks> {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new Error('task not found');
    }
    return task;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDTO): Promise<Tasks> {
    const { creator: creatorId, ...taskData } = updateTaskDto;
    if (creatorId) {
      const creator = await this.userRepository.findOne({ where: { id: creatorId } });
      if (!creator) {
        throw new Error('creator not found');
      }
      await this.taskRepository.update(id, { ...taskData });
    } else {
      await this.taskRepository.update(id, { ...taskData });
    }
    const updatedTask = await this.taskRepository.findOne({ where: { id: id }, relations: ['creator'] });
    if (!updatedTask) {
      throw new Error('task not found');
    }
    return updatedTask;
  }

  async deleteTask(id: number): Promise<Tasks> {
    const task = await this.taskRepository.findOne({ where: { id: id }, relations: ['creator'] });
    if (!task) {
      throw new Error('task not found');
    }
    await this.taskRepository.delete(id);
    return task;
  }
}
