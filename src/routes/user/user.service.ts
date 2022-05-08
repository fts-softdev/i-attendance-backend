import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from 'src/base/base.api/base.service';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
        super(userModel);
    }

    // find emailAddress
    async findEmailToAuthentication(emailAddress: string): Promise<User[]> {
        const users = (await this.userModel.find({ emailAddress: emailAddress }));
        return users;
    }

    // find emailAddress
    async findUserAtToken(token: string): Promise<User> {
        const users = (await this.userModel.find({ access_token: token })) as User[];
        return users[0];
    }
}
