import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/users.service';
import { Users } from '../modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Users | null> {
    const user = await this.usersService.findOne(username);
    if (user && user.validatePassword(password)) {
      return user;
    }
    throw new UnauthorizedException();
  }

  // async signIn(
  //   username: string,
  //   password: string,
  // ): Promise<{ success: boolean; token?: string }> {
  //   const user = await this.usersService.findOne(username);
  //   if (user?.password !== password) {
  //     throw new UnauthorizedException();
  //   }
  //   return {
  //     success: true,
  //     token: await this.jwtService.signAsync({
  //       sub: user.id,
  //       username: user.username,
  //     }),
  //   };
  // }
}
