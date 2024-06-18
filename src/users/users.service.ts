import { Injectable } from '@nestjs/common';
import { Users } from './schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name, 'share-your-favorite-places')
    private UsersModel: Model<Users>,
  ) {}

  async getUserList(): Promise<any> {
    const list = await this.UsersModel.find().select({ _id: 0 });
    return list;
  }
}
