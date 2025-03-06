import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tasks } from './entities/task.entity';
import { Users } from '../users/entities/user.entity';
import { TaskDTO } from './dto/task.dto';
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

    const task = this.taskRepository.create({ ...createTaskDto, creator: user });
    return this.taskRepository.save(task);
  }

  async getTasks(): Promise<Tasks[]> {
    return this.taskRepository.find({ relations: ['creator'] });
  }

  async getTaskById(id: number): Promise<TaskDTO> {
    const task = await this.taskRepository.findOne({ where: { id: id }, relations: ['creator'] });
    if (!task) {
      throw new Error('task not found');
    }
  
    return {
      id: task.id,
      name: task.name,
      contents: task.contents,
      creator: task.creator.id,
      due_date: task.due_date,
      status: task.status,
      priority: task.priority,
    };
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDTO): Promise<Tasks> {
    const { creator: creatorId, ...taskData } = updateTaskDto;
    if (creatorId) {
      const creator = await this.userRepository.findOne({ where: { id: creatorId } });
      if (!creator) {
        throw new Error('creator not found');
      }
      await this.taskRepository.update(id, { ...taskData, creator });
    } else {
      await this.taskRepository.update(id, { ...taskData });
    }
    const updatedTask = await this.taskRepository.findOne({ where: { id: id }, relations: ['creator'] });
    if (!updatedTask) {
      throw new Error('task not found');
    }
    return updatedTask;
  }

  async deleteTask(id: number): Promise<TaskDTO> {
    const task = await this.taskRepository.findOne({ where: { id: id }, relations: ['creator'] });
    if (!task) {
      throw new Error('task not found');
    }
    await this.taskRepository.delete(id);
    return {
      id: task.id,
      name: task.name,
      contents: task.contents,
      creator: task.creator.id,
      due_date: task.due_date,
      status: task.status,
      priority: task.priority,
    };
  }
}
