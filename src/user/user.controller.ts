import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { Request } from 'express';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'User đăng ký' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    schema: {},
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: 'User đăng Nhập' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Get('/me')
  @ApiOperation({ summary: 'User Lấy thông tin cá nhân' })
  @ApiHeader({
    name: 'X-access-token',
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async getProfileUser(@Req() req: Request) {
    return this.userService.getProfileUser(req);
  }
}
