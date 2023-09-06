import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { UUID } from 'crypto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    return { data: await this.devicesService.create(createDeviceDto) };
  }

  @Get()
  async findAll() {
    return { data: await this.devicesService.findAll() };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return { data: await this.devicesService.findOne(id) };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return { data: await this.devicesService.update(id, updateDeviceDto) };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return { data: await this.devicesService.remove(id) };
  }
}