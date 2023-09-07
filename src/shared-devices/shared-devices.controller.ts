import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SharedDevicesService } from './shared-devices.service';
import { CreateSharedDeviceDto } from './dto/create-shared-device.dto';
import { UpdateSharedDeviceDto } from './dto/update-shared-device.dto';

@Controller('shared-devices')
export class SharedDevicesController {
  constructor(private readonly sharedDevicesService: SharedDevicesService) {}

  @Post()
  create(@Body() createSharedDeviceDto: CreateSharedDeviceDto) {
    return this.sharedDevicesService.create(createSharedDeviceDto);
  }

  @Get()
  findAll() {
    return this.sharedDevicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sharedDevicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSharedDeviceDto: UpdateSharedDeviceDto) {
    return this.sharedDevicesService.update(+id, updateSharedDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sharedDevicesService.remove(+id);
  }
}
