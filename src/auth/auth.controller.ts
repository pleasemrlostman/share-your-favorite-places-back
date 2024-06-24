import { Post, Body, Controller } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  PickType,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserRegisterDto } from 'src/users/dto/users.dto';
import { UserRegisterBody } from 'src/users/schema/users.schema';
import * as bcrypt from 'bcrypt';

@ApiTags('인증: auth') // 태그 추가
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '유저 등록하기' })
  @ApiBody({
    description: 'The user registration payload',
    type: UserRegisterBody,
  })
  @ApiResponse({
    status: 200,
    description: 'List of users fetched successfully',
    type: PickType(UserRegisterBody, ['name', 'nickname', 'email']),
  })
  async createUser(@Body() user: UserRegisterDto) {
    const hash = await bcrypt.hash(
      user.password,
      parseInt(process.env['HASH_ROUND']),
    );

    const newUser = await this.usersService.createUser({
      ...user,
      password: hash,
    });

    return {
      username: newUser.name,
      email: newUser.email,
    };
  }
}
