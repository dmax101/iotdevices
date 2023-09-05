import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return { token: await this.authService.login(body.email, body.password) };
  }

  @Get('test-auth')
  @UseGuards(JwtGuard)
  test() {
    return { name: 'Danilo Ribeiro' };
  }
}
