import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { UserDTO } from './dto/user.dto';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async getUserById(id: number): Promise<UserDTO | null> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new Error('user not found');
    }

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      profilePicture: user.profile_picture
        ? `data:image/png;base64,${user.profile_picture.toString('base64')}`
        : null,
    };
  }

  async getUserByUsername(username: string): Promise<Users | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(
    createUserDTO: CreateUserDTO,
  ): Promise<Users> {
    const user = this.userRepository.create(createUserDTO);

    return this.userRepository.save(user);
  }
}
