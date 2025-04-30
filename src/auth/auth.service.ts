import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { CreateUser } from 'src/schemas/user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async handleUser(userData: any): Promise<any> {

    const user = await this.findUser(userData.id);

    if (user) {
        return user;
    }

    const createData: CreateUser = {
      googleId: userData.id,
      username: userData.displayName,
      email: userData.emails[0].value,
    };

    return await this.createUser(createData);
  };

  private async findUser(id: string) : Promise<User | null> {
    return await this.UserModel.findOne({
        googleId: id,
    });
  };

  private async createUser(userData: CreateUser): Promise<User> {
    const UserCreate = new this.UserModel(userData);
    return UserCreate.save();
  };
}
