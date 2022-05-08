import { Body, Controller, Post } from "@nestjs/common";
import { Objective } from "../objective/objective.entity";
import { RecipientService } from "./recipient.service";

@Controller('mailers')
export class RecipientController {
    constructor(private recipientService: RecipientService) {}

    /**
     * Sign up
     * @name signUp 
     * @param {*} body 
     * @returns 
     */
    @Post("welcome")
    async sendWelcome(@Body() body:any) {
        let user = new Objective();
        user.toJson(body);
        return await this.recipientService.sendWelcome(user);
    }
}