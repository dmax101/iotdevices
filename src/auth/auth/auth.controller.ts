import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from './role.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return { token: await this.authService.login(body.email, body.password) };
  }

  @Post('logout')
  async logout(@Headers('authorization') authorizationHeader: string) {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Authorization header');
    }

    const token = authorizationHeader.replace('Bearer ', '');

    this.authService.addToBlacklist(token);

    return { message: 'Logged out successfully!' };
  }

  @Role(['admin'])
  @Get('test-auth')
  @UseGuards(JwtGuard, RoleGuard)
  test() {
    return { name: 'Danilo Ribeiro' };
  }
}
