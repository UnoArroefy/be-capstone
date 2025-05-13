import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { CreateUser } from 'src/schemas/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async handleUser(userData: any): Promise<string> {
    const email = userData.emails[0].value;
    let user = await this.findUser(email);

    if (!user) {
      const createData: CreateUser = {
        username: userData.displayName,
        email: email,
      };

      user = await this.createUser(createData);
    }

    return this.jwtService.sign({
      email: user.email,
      role: user.role,
    });
  }

  private async findUser(email: string): Promise<User | null> {
    return await this.UserModel.findOne({
      email: email,
    });
  }

  private async createUser(userData: CreateUser): Promise<User> {
    const UserCreate = new this.UserModel(userData);
    return UserCreate.save();
  }
}
