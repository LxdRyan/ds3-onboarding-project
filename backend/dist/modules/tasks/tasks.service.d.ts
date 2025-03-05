import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
export declare class TasksService {
    private readonly taskRepository;
    private readonly userRepository;
    constructor(taskRepository: Repository<Task>, userRepository: Repository<User>);
    createTask(userId: number, taskData: Partial<Task>): Promise<Task>;
    getTasks(): Promise<Task[]>;
}
