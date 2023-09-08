import { Injectable } from '@nestjs/common';
import { CreateSharedDeviceDto } from '../dto/create-shared-device.dto';
import { UpdateSharedDeviceDto } from '../dto/update-shared-device.dto';

@Injectable()
export class SharedDevicesService {
  create(createSharedDeviceDto: CreateSharedDeviceDto) {
    return 'This action adds a new sharedDevice';
  }

  findAll() {
    return `This action returns all sharedDevices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sharedDevice`;
  }

  update(id: number, updateSharedDeviceDto: UpdateSharedDeviceDto) {
    return `This action updates a #${id} sharedDevice`;
  }

  remove(id: number) {
    return `This action removes a #${id} sharedDevice`;
  }
}
