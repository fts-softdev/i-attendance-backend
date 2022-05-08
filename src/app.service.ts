import { Injectable } from '@nestjs/common';
import { AuthService } from './routes/auth/auth.service';

@Injectable()
export class AppService {

  constructor(private authService: AuthService) {}

  getHello(): string {
    return 'Hello World!';
  }

  login(req: any) {
    return this.authService.login(req);
  }
}
