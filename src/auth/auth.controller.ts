import {
  Post,
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  PickType,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UserRegisterDto, UserRegisterBody } from 'src/users/dto/users.dto';
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
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() user: UserRegisterDto) {
    const hash = await bcrypt.hash(
      user.password,
      parseInt(process.env['HASH_ROUND']),
    );

    const newUser = await this.usersService.createUser({
      ...user,
      password: hash,
      // profile_image: user.profile_image ? user.profile_image : '',
    });

    return {
      username: newUser.name,
      email: newUser.email,
    };
  }
}
