import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { randomBytes, scryptSync } from 'crypto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // display name
  name: string;

  @Column({ unique: true }) // username as unique identifier for login
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    const salt = randomBytes(16).toString('hex'); // create salt
    this.password = salt + scryptSync(this.password, salt, 64).toString('hex'); // hash password with salt
  }

  @OneToMany(() => Task, (task) => task.creator)
  tasks: Task[]
}
