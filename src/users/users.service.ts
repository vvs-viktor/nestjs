import {
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schemas';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find({}).populate('products').exec();
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const isExist = await this.userModel.exists({ username: userDto.username });
    if (isExist) {
      throw new ForbiddenException('The username already exists');
    } else {
      const saltOrRounds = 10;
      // const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(userDto.password, saltOrRounds);
      const newUser = new this.userModel({ ...userDto, password: hash });
      return newUser.save();
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).populate('products').exec();
  }

  async findById(id) {
    return this.userModel.findById(new mongoose.Types.ObjectId(id));
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async update(user: User, products) {
    return this.userModel.updateOne(user, { products });
  }
}
