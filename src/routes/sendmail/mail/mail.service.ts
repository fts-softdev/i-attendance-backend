import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import type { Objective } from '../objective/objective.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendUserWelcome(user: Objective, token: string) {
    const welcomeImageUrl = "https://previews.123rf.com/images/foxysgraphic/foxysgraphic1907/foxysgraphic190700061/129432470-welcome-banner-speech-bubble-poster-concept-geometric-memphis-style-with-text-welcome-icon-balloon-w.jpg";
    const name = user.name;
    const toMail = user.email;

    await this.mailerService.sendMail({
      to: toMail,
      subject: 'Welcome new member',
      template: 'welcome',
      context: {
        name: name,
        welcome: welcomeImageUrl
      },
    });
  }
}
