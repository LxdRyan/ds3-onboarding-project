import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ success: boolean; token?: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== password) {
      return { success: false };
    }
    return {
      success: true,
      token: await this.jwtService.signAsync({ sub: user.id, username: user.username }),
    };
  }
}
