import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    return { token: this.authService.login(body.username, body.password) };
  }

  @Get('test-auth')
  @UseGuards(JwtGuard)
  test() {
    return { name: 'Danilo Ribeiro' };
  }
}
