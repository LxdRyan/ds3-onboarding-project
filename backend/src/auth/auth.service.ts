import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { scryptSync, timingSafeEqual } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByUsername(username);
    if (!user) throw new UnauthorizedException('wrong username or password');

    const [salt, storedHash] = user.password.split(':'); // split salt and hash
    const hashedInput = scryptSync(password, salt, 64).toString('hex'); // get hashed password based on input

    if (
      !timingSafeEqual(
        Buffer.from(storedHash, 'hex'),
        Buffer.from(hashedInput, 'hex'),
      )
    ) {
      throw new UnauthorizedException('wrong username or password');
    }

    return { id: user.id, username: user.username };
  }

  async login(user: any) {
    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
