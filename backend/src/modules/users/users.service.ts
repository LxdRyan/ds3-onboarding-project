import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async findOne(username: string): Promise<Users | null> {
    return this.userRepository.findOne({ where: { username } });
  }
  
  async createUser(createUserDTO: CreateUserDTO): Promise<Users> {
    const user = this.userRepository.create(createUserDTO);
    await this.userRepository.save(user);
    return user;
  }

  async onModuleInit() {
    await this.createTestUser();
  }

  async createTestUser() {
    const testUserExists = await this.findOne("test")

    if (!testUserExists) {
      await this.createUser({
        name: process.env.TEST_USER_NAME || "test",
        username: process.env.TEST_USER_USERNAME || "test",
        password: process.env.TEST_USER_PASSWORD || "test",
      })
    }
  }

  async getUsers(): Promise<UserDTO[]> {
    const users = await this.userRepository.find();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
    }));
  }

  async getUserById(id: number): Promise<UserDTO | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('user not found');
    }

    return {
      id: user.id,
      name: user.name,
      username: user.username,
    };
  }

  async updateUser(id: number, updateUserDto: UpdateUserDTO): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('user not found');
    }

    await this.userRepository.update(id, updateUserDto);

    return {
      id: id,
      username: updateUserDto.username,
      name: updateUserDto.name,
    };
  }

  async forgotPassword(username: string, updatePasswordDto: UpdatePasswordDTO): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { username: username } });

    if (!user) {
      throw new Error('user not found');
    };

    if (user.username === updatePasswordDto.username && user.name === updatePasswordDto.name) {
      user.password = updatePasswordDto.password
      await this.userRepository.save(user);
    } else {
      throw new Error('invalid username or name');
    };

    return {
      id: user.id,
      name: user.name,
      username: user.username,
    };
  }

  async deleteUser(id: number): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('user not found');
    }

    await this.userRepository.delete(id);

    return {
      id: id,
      name: user.name,
      username: user.username,
    };
  }
}
