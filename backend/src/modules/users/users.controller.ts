import { Controller, Get, Post, Body, Param, Req, UseGuards, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
// import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
    async createUser(@Body() createUserDto: CreateUserDTO) {
      await this.usersService.createUser(createUserDto);
      return {
        success: true,
        message: 'user created successfully',
      };
    }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    await this.usersService.getUserById(id);
    return {
      success: true,
      message: 'user retrived',
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDTO) {
    await this.usersService.updateUser(id, updateUserDto);
    return {
      success: true,
      message: 'user updated',
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.deleteUser(id);
    return {
      success: true,
      message: 'user deleted',
    };
  }
}
