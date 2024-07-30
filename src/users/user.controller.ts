import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/incomplete-user.dto';
import { RegistrationDto } from 'src/users/dto/registration.dto';
import { UserService } from 'src/users/user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post('register')
  async registerUser(@Body() registrationDto: RegistrationDto): Promise<UserDto> {
    return this.userService.registerUser(registrationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserDto> {
    return this.userService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateData: Partial<RegistrationDto>): Promise<UserDto> {
    return this.userService.updateUser(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
  }
}