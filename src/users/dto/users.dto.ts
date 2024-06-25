import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PickType } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'strongpassword123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'The nick name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Nick name is required' })
  nickname: string;

  //   @ApiProperty({
  //     description: 'profile image of the user',
  //     example: 'John Doe',
  //   })
  //   profile_image: string;
}

export class UserRegisterBody extends PickType(UserRegisterDto, [
  'email',
  'password',
  'name',
  'nickname',
  // 'profile_image',
  // 'role',
] as const) {}

export class UserLoginBody extends PickType(UserRegisterDto, [
  'email',
  'password',
] as const) {}
