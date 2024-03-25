import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';
import { CreateUserDto } from './create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenAuthGuard } from 'src/token-auth/token-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  @Get()
  getUsers() {
    return this.userModel.find();
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

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  async login(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(TokenAuthGuard)
  @Get('logOut')
  async secret(@Req() req: Request) {
    return req.user;
  }
}
