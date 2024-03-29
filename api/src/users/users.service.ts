import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { HttpRes } from '../helpers/HttpRes.utils';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.UserModel(createUserDto);
      return HttpRes.success(await createdUser.save(), 201);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async findAll() {
    try {
      const users = await this.UserModel.find().exec();
      if (!users) throw new NotFoundException(['User not found']);
      return HttpRes.success(users);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.UserModel.findById(id).exec();
      if (!user) throw new NotFoundException(['User not found']);
      return HttpRes.success(user);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.UserModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
      if (!user) throw new NotFoundException(['User not found']);
      return HttpRes.success(user);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.UserModel.findByIdAndDelete(id).exec();
      if (!user) throw new NotFoundException(['User not found']);
      return HttpRes.success(user);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }
}
