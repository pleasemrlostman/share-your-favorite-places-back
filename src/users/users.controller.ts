import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserRegisterDto } from './dto/users.dto';
import { UserRegisterBody } from './schema/users.schema';

@ApiTags('유저: Users') // 태그 추가
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  @ApiOperation({ summary: '유저 리스트 받아오기' }) // 작업(Operation) 요약 추가
  @ApiResponse({
    status: 200,
    description: 'List of users fetched successfully',
  })
  async getUsersList() {
    return this.usersService.getUserList();
  }

  @Post('register')
  @ApiOperation({ summary: '유저 등록하기' })
  @ApiBody({
    description: 'The user registration payload',
    type: UserRegisterBody,
  })
  async createUser(@Body() userDto: UserRegisterDto) {
    return this.usersService.createUser({
      name: userDto.name,
      password: userDto.password,
      email: userDto.email,
      nickname: userDto.nickname,
    });
  }
}
