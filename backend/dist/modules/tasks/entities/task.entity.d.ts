import { User } from '../../users/entities/user.entity';
export declare class Task {
    id: number;
    name: string;
    contents: string;
    creator: User;
    dueDate: Date;
    status: string;
    priority: string;
}
