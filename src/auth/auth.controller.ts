import {
  Post,
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
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
import {
  UserRegisterDto,
  UserRegisterBody,
  UserLoginBody,
} from 'src/users/dto/users.dto';
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

  @Post('login')
  @ApiOperation({ summary: '유저 로그인' })
  async login(@Body() loginUser: UserLoginBody) {
    // 1. 일단 email과 맞는 유저가 있는지 찾아야 함.
    const hasUser = await this.usersService.getUserByEmail(loginUser.email);
    if (!hasUser) {
      throw new UnauthorizedException(
        '비밀번호 또는 아이디가 틀립니다. 다시 시도해주세요.',
      );
    }

    const isAuthorizedUserHashPassword = await bcrypt.compare(
      loginUser.password,
      hasUser.password,
    );

    if (!isAuthorizedUserHashPassword) {
      throw new UnauthorizedException(
        '비밀번호 또는 아이디가 틀립니다. 다시 시도해주세요.',
      );
    }
    // 2. 해당 email에 있는 비밀번호 해쉬값과 일치하면
    // 3. 로그인 성공
    // 3-1. 로그인 실패
  }
}
