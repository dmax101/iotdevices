import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateSharedDeviceDto } from './dto/create-shared-device.dto';
import { UpdateSharedDeviceDto } from './dto/update-shared-device.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { SharedDevicesService } from './services/shared-devices.service';
import { DeviceRoleGuard } from 'src/shared-devices/guards/device-role.guard';
import { DeviceRole } from 'src/auth/decorators/device-role.decorator';
import { UUID } from 'crypto';

@Controller('shared-devices')
@UseGuards(JwtGuard)
export class SharedDevicesController {
  constructor(private readonly sharedDevicesService: SharedDevicesService) {}

  @Post()
  @UseGuards(DeviceRoleGuard)
  @DeviceRole(['owner'])
  async create(@Body() createSharedDeviceDto: CreateSharedDeviceDto) {
    return {
      data: await this.sharedDevicesService.create(createSharedDeviceDto),
    };
  }

  @Get()
  async findAll() {
    return { data: await this.sharedDevicesService.findAll() };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return { data: await this.sharedDevicesService.findOne(id) };
  }

  @Patch(':id')
  @UseGuards(DeviceRoleGuard)
  @DeviceRole(['owner', 'editor'])
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateSharedDeviceDto: UpdateSharedDeviceDto,
  ) {
    return {
      data: await this.sharedDevicesService.update(id, updateSharedDeviceDto),
    };
  }

  @Delete(':id')
  @UseGuards(DeviceRoleGuard)
  @DeviceRole(['owner'])
  async remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return { data: await this.sharedDevicesService.remove(id) };
  }
}
