import { Module } from '@nestjs/common';
import { SharedDevicesController } from './shared-devices.controller';
import { SharedDeviceModel } from './entities/shared-device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DevicesModule } from 'src/devices/devices.module';
import { SharedDevicesService } from './services/shared-devices.service';

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
