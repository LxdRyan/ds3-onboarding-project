export class TaskDTO {
    id: number;
    name: string;
    contents: string | null;
    creator: number;
    due_date: Date;
    status: string;
    priority: string;
}