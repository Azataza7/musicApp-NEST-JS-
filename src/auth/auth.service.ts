import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });

    if (user) {
      const passwordIsCorrect = await user.checkPassword(pass);
      if (passwordIsCorrect) {
        user.generateToken();
        await user.save();

        return user;
      }
    }

    return null;
  }
}
