import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  doLogin(@Body('email') email: string, @Body('password') password: string) {
    return { id: this.userService.doLogin() };
  }
}
