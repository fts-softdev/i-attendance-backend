import { Controller, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseController } from 'src/base/base.api/base.controller';
import { User } from './schemas/user.schema';
import { Put } from '@nestjs/common';

@Controller('users')
export class UserController extends BaseController<User> {
  constructor(
    private readonly userService: UserService,
  ) {
    super(userService);
  }

  @Put()
  update(@Body() updateDto: UpdateUserDto) {
    return this.userService.update(updateDto);
  }

  @Get("/:token")
  async getUserByAccessToken(@Param('token') token: string) {
    return this.userService.findUserAtToken(token)
  }
}
