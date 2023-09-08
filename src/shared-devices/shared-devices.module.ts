import { Module } from '@nestjs/common';
import { SharedDevicesController } from './shared-devices.controller';
import { SharedDeviceModel } from './entities/shared-device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DevicesModule } from 'src/devices/devices.module';
import { SharedDevicesService } from './services/shared-devices.service';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/users/entities/user.entity';
import { DeviceModel } from 'src/devices/entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SharedDeviceModel, UserModel, DeviceModel]),
    UsersModule,
    DevicesModule,
  ],
  controllers: [SharedDevicesController],
  providers: [SharedDevicesService, JwtService],
})
export class SharedDevicesModule {}
