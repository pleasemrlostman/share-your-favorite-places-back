import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRegisterDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name, 'share-your-favorite-places')
    private userModel: Model<User>,
  ) {}

  async getUserList(): Promise<any> {
    const list = await this.userModel.find().select({ _id: 0 });
    return list;
  }

  async getUserByEmail(email: string) {
    const emailExists = await this.userModel.findOne({ email: email });
    return emailExists;
  }
  async getUserByNickname(nickname: string) {
    const nicknameExists = await this.userModel.findOne({ nickname: nickname });
    return nicknameExists;
  }

  async createUser(user: UserRegisterDto) {
    const emailExists = await this.getUserByEmail(user.email);
    if (emailExists) {
      throw new BadRequestException('이미 존재하는 이메일 입니다');
    }
    const nicknameExists = await this.getUserByNickname(user.nickname);
    if (nicknameExists) {
      throw new BadRequestException('이미 존재하는 닉네임 입니다');
    }
    const _newUser = {
      name: user.name,
      password: user.password,
      email: user.email,
      nickname: user.nickname,
      // profile_image: user.profile_image,
    };
    const newUser = new this.userModel(_newUser);
    return newUser.save(); // MongoDB 클라우드에 저장
  }
}
