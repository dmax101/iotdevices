import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceModel } from './entities/device.entity';
import { UUID } from 'crypto';
import { UserModel } from 'src/users/user.model';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(DeviceModel) private deviceModel: Repository<DeviceModel>,
    @InjectRepository(UserModel) private userModel: Repository<UserModel>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<CreateDeviceDto> {
    const user = await this.userModel.findOne({
      where: { id: createDeviceDto.user_id },
    });

    console.log(user);

    if (!user) {
      throw new NotFoundException(
        'User not found! The device needs a valid user!',
      );
    }

    const deviceCreated = await this.deviceModel.save({
      ...createDeviceDto,
      user: user,
    });

    delete deviceCreated.user;

    return deviceCreated;
  }

  async findAll(): Promise<DeviceModel[]> {
    const devicesList = await this.deviceModel.find();

    return devicesList;
  }

  async findOne(id: UUID): Promise<DeviceModel> {
    const device = await this.deviceModel.findOne({ where: { id } });
    return device;
  }

  async update(id: UUID, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.deviceModel.findOne({ where: { id } });

    if (!device) {
      throw new NotFoundException('Device not found!');
    }

    await this.deviceModel.update({ id }, updateDeviceDto);

    return { ...device, ...updateDeviceDto };
  }

  async remove(id: UUID): Promise<DeviceModel> {
    const device = await this.deviceModel.findOne({ where: { id } });

    if (!device) {
      throw new NotFoundException('Device not found!');
    }

    this.deviceModel.delete({ id });

    return device;
  }
}
