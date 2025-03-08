import { Controller, Get, Post, Body, Param, Req, UseGuards, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Public } from 'src/auth/auth.constants';
// import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDTO) {
    return {
      success: true,
      data: await this.usersService.createUser(createUserDto),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number) {
    return {
      success: true,
      data: await this.usersService.getUserById(id),
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    return {
      success: true,
      data: await this.usersService.updateUser(id, updateUserDto),
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: number) {
    return {
      success: true,
      data: await this.usersService.deleteUser(id),
    };
  }
}
