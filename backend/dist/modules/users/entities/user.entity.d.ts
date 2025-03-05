import { Task } from '../../tasks/entities/task.entity';
export declare class User {
    id: number;
    name: string;
    username: string;
    password: string;
    hashPassword(): void;
    profilePicture: Buffer | null;
    tasks: Task[];
}
