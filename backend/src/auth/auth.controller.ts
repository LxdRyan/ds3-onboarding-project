import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.constants';
import { Request as ExpressRequest } from 'express';
import { AuthLocalGuard } from './auth.local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Public()
  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // login(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(AuthLocalGuard)
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(AuthLocalGuard)
  async logout(@Request() req: ExpressRequest) {
    return req.logout((err) => {
      if (err) return err;
    });
  }

  // @Get('profile')
  // getProfile(@Request() request: any) {
  //   return request.user;
  // }
}
