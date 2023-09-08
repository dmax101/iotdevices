import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceModel } from 'src/devices/entities/device.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SharedDeviceModel } from '../entities/shared-device.entity';

@Injectable()
export class DeviceRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    @InjectRepository(UserModel) private userModel: Repository<UserModel>,
    @InjectRepository(DeviceModel) private deviceModel: Repository<DeviceModel>,
    @InjectRepository(SharedDeviceModel)
    private sharedDeviceModel: Repository<SharedDeviceModel>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles: string[] = this.reflector.get(
      'device-role',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'].replace('Bearer ', '');
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.SECRET_KEY,
    });

    if (roles.includes('owner') && this.isOwner(payload, request.body)) {
      return true;
    }

    if (roles.includes('editor') && this.isEditor(payload, request.params, request.body)) {
      return true;
    }

    if (roles.includes('viewer') && this.isViewer(payload, request.params, request.body)) {
      return true;
    }

    return false;
  }

  private isOwner(payload: any, body: any): boolean {
    return payload['sub'] === body.owner_id;
  }

  private async isEditor(payload: any, params: any, body: any): Promise<boolean> {
    const sharedDevice = await this.sharedDeviceModel.findOne({
      where: { id: params.id },
    });

    if (!sharedDevice) {
      throw new NotFoundException('Resource not found!');
    }

    return (
      sharedDevice.userDeviceRole === 'editor' && payload['sub'] === body.user_id
    );
  }

  private async isViewer(payload: any, params: any, body: any): Promise<boolean> {
    const sharedDevice = await this.sharedDeviceModel.findOne({
      where: { id: params.id },
    });

    return (
      sharedDevice.userDeviceRole === 'viewer' && payload['sub'] === body.user_id
    );
  }
}
