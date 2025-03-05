import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<UserDTO | null> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('user not found');
    }

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      profilePicture: user.profilePicture
        ? `data:image/png;base64,${user.profilePicture.toString('base64')}`
        : null,
    };
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(
    createUserDTO: CreateUserDTO,
  ): Promise<User> {
    const user = this.userRepository.create(createUserDTO);

    return this.userRepository.save(user);
  }
}
