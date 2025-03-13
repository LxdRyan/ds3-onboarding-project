import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.constants';
import { Request as ExpressRequest } from 'express';
import { AuthLocalGuard } from './auth.local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(AuthLocalGuard)
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user)
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(AuthLocalGuard)
  async logout(@Request() req: ExpressRequest) {
    return req.logout((err) => {
      if (err) return err;
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async profile(@Request() req: ExpressRequest) {
    if (req.user && 'sub' in req.user) {
      return {
        success: true,
        contents: req.user.sub,
      };
    }
    throw new Error('user not found');
  }
}