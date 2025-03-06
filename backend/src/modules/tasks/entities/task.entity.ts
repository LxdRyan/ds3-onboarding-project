import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from '../../users/entities/user.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contents: string;

  @ManyToOne(() => Users, (user) => user.tasks, { eager: true })
  creator: Users;

  @Column()
  due_date: Date;

  @Column()
  status: string;

  @Column()
  priority: string;
}