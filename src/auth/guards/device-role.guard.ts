import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    @InjectRepository(UserModel) private userModel: Repository<UserModel>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const role: string[] = this.reflector.get('device-role', context.getHandler());

    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].replace('Bearer ', '');
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY,
    });

    if (role.includes('admin') && payload['isAdmin']) {
      return true;
    }

    if (role.includes('owner') && payload['sub'] === request.params.id) {
      return true;
    }

    return false;
  }
}
