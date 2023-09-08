import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSharedDeviceDto } from '../dto/create-shared-device.dto';
import { UpdateSharedDeviceDto } from '../dto/update-shared-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceModel } from 'src/devices/entities/device.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SharedDeviceModel } from '../entities/shared-device.entity';

@Injectable()
export class SharedDevicesService {
  constructor(
    @InjectRepository(DeviceModel) private deviceModel: Repository<DeviceModel>,
    @InjectRepository(UserModel) private userModel: Repository<UserModel>,
    @InjectRepository(SharedDeviceModel)
    private sharedDeviceModel: Repository<SharedDeviceModel>,
  ) {}

  async create(createSharedDeviceDto: CreateSharedDeviceDto) {
    const { userDeviceRole, user_id, owner_id, device_id } =
      createSharedDeviceDto;

    const alreadCreatedSharedDevice = await this.sharedDeviceModel
    .createQueryBuilder('shared')
    .where('shared.user.id = :user_id', { user_id })
    .andWhere( 'shared.device.id = :device_id', { device_id })
    .getOne()

    console.log(alreadCreatedSharedDevice);  
    

    if (alreadCreatedSharedDevice) {
      throw new ConflictException('User device already shared with the user!')
    }

    const owner: UserModel = await this.userModel
      .createQueryBuilder('user')
      .innerJoin('user.devices', 'device')
      .where('user.id = :owner_id', { owner_id })
      .andWhere('device.id = :device_id', { device_id })
      .select(['user', 'device.id'])
      .getOne();

    if (!owner) {
      throw new NotFoundException('Owner or device not found!');
    }

    const user = await this.userModel.findOne({
      where: { id: user_id },
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const sharedDevice = await this.sharedDeviceModel.save({
      device: owner.devices.find((e) => e.id === device_id),
      deviceRole: userDeviceRole,
      user: user,
    });

    console.log(sharedDevice);

    return sharedDevice;
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
