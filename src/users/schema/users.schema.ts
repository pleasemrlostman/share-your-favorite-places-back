import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ collection: 'users' })
export class Users extends Document {
  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  email: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @Prop({ required: true })
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @Prop({ unique: true })
  @ApiProperty({ description: 'The nickname of the user', example: 'john_doe' })
  nickname: string;

  @Prop()
  @ApiProperty({
    description: "The URL of the user's profile image",
    example: 'https://example.com/profile.jpg',
  })
  profile_image: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
