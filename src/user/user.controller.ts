import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  doLogin(@Body('email') email: string, @Body('password') password: string) {
    return { id: this.userService.doLogin() };
  }
  @Post('signup')
  async doSignup(
    @Body() body: { email: string; fullName: string; password: string },
  ): Promise<any> {
    const res = await this.userService.doSignup(body);
    return res;
  }
}
