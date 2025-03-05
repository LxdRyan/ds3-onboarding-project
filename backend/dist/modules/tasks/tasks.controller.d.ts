import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    createTask(userId: number, taskData: Partial<Task>): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
}
