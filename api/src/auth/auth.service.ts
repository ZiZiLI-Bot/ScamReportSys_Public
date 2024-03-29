/* eslint-disable @typescript-eslint/no-unused-vars */
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import mongoose, { Model } from 'mongoose';
import { HttpRes, TSuccess } from '../helpers/HttpRes.utils';
import { Auth } from './auth.schema';
import { User } from '../users/users.schema';
import { changePassDto } from './dto/change-pass.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';

const saltRounds = 10;

class loginResponse extends Auth {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private AuthModel: Model<Auth>,
    @InjectModel(User.name) private UserModel: Model<User>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private JwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<Auth | null> {
    const user = await this.AuthModel.findOne({ email }).exec();
    return user;
  }

  async login(loginDto: LoginDto): Promise<TSuccess<loginResponse>> {
    try {
      const findAuth = await this.AuthModel.findOne({ email: loginDto.email }).populate('user');
      if (!findAuth) throw new NotFoundException('Email or password is incorrect');
      if (findAuth.isBlocked) throw new MethodNotAllowedException('User is blocked');
      const passwordMatch = await bcrypt.compare(loginDto.password, findAuth.password);
      if (!passwordMatch) throw new NotFoundException('Email or password is incorrect');
      const payload = {
        email: findAuth.email,
        _id: findAuth._id,
        role: findAuth.role,
        user_id: findAuth.user?._id,
      };
      const cacheKey = `user:${findAuth._id + findAuth.email + findAuth.role}`;
      this.cacheManager.del(cacheKey);
      const accessToken = this.JwtService.sign(payload);
      const response = { ...findAuth.toJSON(), access_token: accessToken };
      return HttpRes.success(response);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async findMe(user: { email: string; _id: string; role: string }) {
    try {
      const cacheKey = `user:${user._id + user.email + user.role}`;
      const cachedUser = await this.cacheManager.get(cacheKey);
      if (cachedUser) return cachedUser;

      const findAuth = await this.AuthModel.findById(user._id).populate('user').lean().exec();
      if (!findAuth) throw new NotFoundException('User not found');
      const response = HttpRes.success(findAuth);
      this.cacheManager.set(cacheKey, response);
      return response;
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async create(createAuthDto: CreateAuthDto) {
    try {
      const passwordHash = await bcrypt.hash(createAuthDto.password, saltRounds);
      const createdAuth = new this.AuthModel({
        ...createAuthDto,
        password: passwordHash,
      });
      const auth = await createdAuth.save();
      const createUser = new this.UserModel(createAuthDto);
      await createUser.save();

      const updateAuth = await auth.updateOne({ user: createUser._id }).lean().exec();

      return HttpRes.success(updateAuth, 201);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async findAll(): Promise<TSuccess<Auth[]>> {
    const allAuth = await this.AuthModel.find().exec();
    return HttpRes.success(allAuth);
  }

  async changePass(id: string, changePassDto: changePassDto): Promise<TSuccess<Auth>> {
    try {
      const findAuth = await this.AuthModel.findById(id);
      if (!findAuth) throw new NotFoundException('Auth not found');
      const passwordMatch = await bcrypt.compare(changePassDto.oldPassword, findAuth.password);
      if (!passwordMatch) throw new MethodNotAllowedException('Password does not match');
      const passwordHash = await bcrypt.hash(changePassDto.newPassword, saltRounds);
      findAuth.password = passwordHash;
      return HttpRes.success(await findAuth.save());
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async update(id: string, updateAuthDto: UpdateAuthDto): Promise<TSuccess<Auth>> {
    try {
      const auth = await this.AuthModel.findByIdAndUpdate(id, updateAuthDto, { new: true }).exec();
      if (!auth) throw new NotFoundException('Auth not found');
      return HttpRes.success(auth);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }

  async remove(id: string): Promise<TSuccess<Auth>> {
    try {
      if (!mongoose.isValidObjectId(id)) throw new MethodNotAllowedException('Invalid id');
      const deletedAuth = await this.AuthModel.findByIdAndDelete(id);
      if (!deletedAuth) throw new NotFoundException('Auth not found');
      return HttpRes.success(deletedAuth);
    } catch (error) {
      throw new BadRequestException([error.message]);
    }
  }
}
