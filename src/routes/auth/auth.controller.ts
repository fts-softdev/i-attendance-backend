import { Param, Post } from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { LocalStrategy } from "./local.strategy";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly localStrategy: LocalStrategy
    ) { }

    @Post()
    async login(@Body() request: { phoneNumber: string, password: string }): Promise<any> {
        return this.login(request);
    }

    // /**
    //  * validate user
    //  * @param userRequest
    //  * @returns
    //  */
    // @Post()
    // async validateUser(@Body() userRequest: { email: string, password: string }): Promise<any> {
    //     // return this.authService.validateUser(user.email, user.password);
    //     return this.localStrategy.validate(userRequest);
    // }
}