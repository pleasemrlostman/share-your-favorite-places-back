import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from './schema/users.schema';
@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Users.name, schema: UserSchema }],
      'share-your-favorite-places',
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
