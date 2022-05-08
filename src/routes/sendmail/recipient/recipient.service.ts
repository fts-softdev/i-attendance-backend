import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import type { Objective } from '../objective/objective.entity';

@Injectable()
export class RecipientService {
  constructor(private mailService: MailService) {}

  async sendWelcome(user: Objective) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    // create user in db
    // ...
    // send confirmation mail
    await this.mailService.sendUserWelcome(user, token);
  }
}
