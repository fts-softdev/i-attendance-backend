import { Body, UseGuards } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Post } from '@nestjs/common';
import { AuthService } from './routes/auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() req) {
    return this.authService.login(req);
  }
}
