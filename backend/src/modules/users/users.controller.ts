import { Controller, Get, Post, Body, Param, Req, UseGuards, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { Public } from 'src/auth/auth.constants';
// import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<{ success: boolean; contents?: any; error?: string }> {
    try {
      const contents = await this.usersService.createUser(createUserDto);
      return { success: true, contents };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<{ success: boolean; contents?: any; error?: string }> {
    try {
      const contents = await this.usersService.getUsers();
      return { success: true, contents };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number): Promise<{ success: boolean; contents?: any; error?: string }> {
    try {
      const contents = await this.usersService.getUserById(id);
      return { success: true, contents };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDTO,
  ): Promise<{ success: boolean; contents?: any; error?: string }> {
    try {
      const contents = await this.usersService.updateUser(id, updateUserDto);
      return { success: true, contents };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Put(':id/password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Param('id') id: number,
    @Body() updatePasswordDto: UpdatePasswordDTO,
  ): Promise<{ success: boolean; contents?: any; error?: string }> {
    try {
      const contents = await this.usersService.updatePassword(id, updatePasswordDto);
      return { success: true, contents };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: number): Promise<{ success: boolean; contents?: any; error?: string }> {
    try {
      const contents = await this.usersService.deleteUser(id);
      return { success: true, contents };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
