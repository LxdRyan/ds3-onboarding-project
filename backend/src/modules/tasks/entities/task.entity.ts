import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contents: string;

  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  creator: number;

  @Column()
  dueDate: Date;

  @Column()
  status: string;

  @Column()
  priority: string;
}