import {
  Body,
  Controller,
  Get,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  @Get()
  async getUsers() {
    return await this.userModel.find();
  }

  @Post()
  async registerUser(@Body() userData: CreateUserDto) {
    try {
      const newUser = new this.userModel({
        email: userData.email,
        password: userData.password,
      });

      newUser.generateToken();

      return newUser.save();
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(e);
      }

      throw e;
    }
  }
}
