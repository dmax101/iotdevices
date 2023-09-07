import { Module } from '@nestjs/common';
import { SharedDevicesService } from './shared-devices.service';
import { SharedDevicesController } from './shared-devices.controller';

@Module({
  controllers: [SharedDevicesController],
  providers: [SharedDevicesService],
})
export class SharedDevicesModule {}
