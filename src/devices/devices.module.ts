import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DeviceModel } from './entities/device.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { UserModel } from 'src/users/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceModel, UserModel]), UsersModule],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
