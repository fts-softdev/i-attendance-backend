import { Injectable } from '@nestjs/common';

// import { User } from '../user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schemas/user.schema';
import { contextStorage } from 'src/common/logger/context-storage';
import { UserService } from '../user/user.service';
// import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) { }

    // /**
    //  * validate user - approach passport strategy
    //  * @param user
    //  * @returns
    //  */
    // async validateUser(userRequest: any): Promise<any> {
    //     const users = (await this.userService.findEmailToAuthentication(userRequest.emailAddress)) as User[];
    //     for (const user of users) {
    //         if (user && user.password === userRequest.pass) {
    //             const { password, ...result } = user;
    //             return result;
    //         }
    //     }
    //     return null;
    // }

    /**
     * login - init access token
     * @param user 
     * @returns 
     */
    async login(user: User) {
        const payload = { phoneNumber: user.soDienThoai, sub: user.password };
        return this.jwtService.sign(payload);
    }
}