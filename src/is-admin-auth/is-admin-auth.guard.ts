import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class IsAdminAuthGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.get('Authorization');

    if (!token) {
      return false;
    }

    const user = await this.userModel.findOne({ token: token });

    if (!user || user.role !== 'admin') {
      return false;
    }

    return true;
  }
}
