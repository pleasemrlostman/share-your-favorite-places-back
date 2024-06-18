import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('유저: Users') // 태그 추가
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  @ApiOperation({ summary: '유저 리스트 받아오기' }) // 작업(Operation) 요약 추가
  @ApiResponse({
    status: 200,
    description: 'List of users fetched successfully',
  }) // 응답(Response) 설명 추가
  async getUsersList() {
    return this.usersService.getUserList();
  }
}
