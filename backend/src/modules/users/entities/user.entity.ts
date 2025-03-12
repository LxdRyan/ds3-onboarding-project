import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, BeforeUpdate } from 'typeorm';
import { Tasks } from '../../tasks/entities/task.entity';
import { randomBytes, scryptSync } from 'crypto';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() // display name
  name: string;

  @Column({ unique: true }) // username as unique identifier for login
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const salt = randomBytes(16).toString('hex'); // create salt
    this.password = salt + scryptSync(this.password, salt, 64).toString('hex'); // hash password with salt
  }

  @Column({ type: 'bytea', nullable: true })
  profile_picture: Buffer | null;

  // @BeforeInsert()
  // @BeforeUpdate()
  // convertProfilePicture() {
  //   this.profile_picture = this.profile_picture ? Buffer.from(this.profile_picture.toString(), 'base64') : null;
  // }

  // @OneToMany(() => Tasks, (task) => task.creator)
  // tasks: Tasks[];

  validatePassword(incomingPassword: string): boolean {
    const salt = this.password.slice(0, 32); // get salt from stored password
    return this.password === salt + scryptSync(incomingPassword, salt, 64).toString('hex'); // compare hashed password
  }
}
