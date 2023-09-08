import { Module } from '@nestjs/common';
import { SharedDevicesService } from './shared-devices.service';
import { SharedDevicesController } from './shared-devices.controller';
import { SharedDeviceModel } from './entities/shared-device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DevicesModule } from 'src/devices/devices.module';
import { UserModel } from 'src/users/entities/user.entity';
import { DeviceModel } from 'src/devices/entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SharedDeviceModel]),
    UsersModule,
    DevicesModule,
  ],
  providers: [SharedDevicesService],
  controllers: [SharedDevicesController],
})
export class SharedDevicesModule {}
