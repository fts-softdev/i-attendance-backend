import { MailModule } from '../mail/mail.module';
import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';

@Module({
  providers: [RecipientService],
  controllers: [RecipientController],
  imports: [MailModule]
})
export class RecipientModule {}
