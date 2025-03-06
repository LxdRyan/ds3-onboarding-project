import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>(
        'JWT_SECRET',
        'default-secret-key',
      ),
    });
  }


  async validate(payload: any) {

    const user = await this.usersService.getUserById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('invalid token');
    }

    return { id: user.id, username: user.username };
  }
}
