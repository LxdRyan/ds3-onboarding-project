import { Controller, Get, Post, Body, Param, Req, UseGuards, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { Public } from 'src/auth/auth.constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDTO): Promise<{ success: boolean; contents?: any; error?: string }> {
    try {
      const contents = await this.usersService.createUser(createUserDto);
      console.log('user created:', contents);
      return { success: true, contents };
    } catch (error) {
      console.error('error creating user:', error.message);
      return { success: false, error: error.message };
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<{ success: boolean; contents?: any; error?: string }> {
    try {
      const contents = await this.usersService.getUsers();
      console.log('users retrieved:', contents);
      return { success: true, contents };
    } catch (error) {
      console.error('error retrieving users:', error.message);
      return { success: false, error: error.message };
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: number): Promise<{ success: boolean; contents?: any; error?: string }> {
    try {
      const contents = await this.usersService.getUserById(id);
      console.log(`user retrieved with id ${id}:`, contents);
      return { success: true, contents };
    } catch (error) {
      console.error(`error retrieving user with id ${id}:`, error.message);
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
      console.log(`user updated with id ${id}:`, contents);
      return { success: true, contents };
    } catch (error) {
      console.error(`error updating user with id ${id}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  @Put(':username/password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Param('username') username: string,
    @Body() updatePasswordDto: UpdatePasswordDTO,
  ): Promise<{ success: boolean; contents?: any; error?: string }> {
    console.log(`updating password for user with username ${username}`)
    try {
      const contents = await this.usersService.forgotPassword(username, updatePasswordDto);
      console.log(`password updated for user with username ${username}:`, contents);
      return { success: true, contents };
    } catch (error) {
      console.error(`error updating password for user with username ${username}:`, error.message);
      return { success: false, error: error.message };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: number): Promise<{ success: boolean; contents?: any; error?: string }> {
    console.log(`deleting user with id: ${id}`);
    try {
      const contents = await this.usersService.deleteUser(id);
      console.log(`user deleted with id ${id}:`, contents);
      return { success: true, contents };
    } catch (error) {
      console.error(`error deleting user with id ${id}:`, error.message);
      return { success: false, error: error.message };
    }
  }
}
