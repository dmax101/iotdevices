import {
  ConflictException,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSharedDeviceDto } from '../dto/create-shared-device.dto';
import { UpdateSharedDeviceDto } from '../dto/update-shared-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceModel } from 'src/devices/entities/device.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SharedDeviceModel } from '../entities/shared-device.entity';
import { UUID } from 'crypto';

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

    if (owner_id === user_id) {
      throw new ConflictException("You can't share a device with yourserlf!");
    }

    const alreadCreatedSharedDevice = await this.sharedDeviceModel
      .createQueryBuilder('shared')
      .where('shared.user.id = :user_id', { user_id })
      .andWhere('shared.device.id = :device_id', { device_id })
      .getOne();

    if (alreadCreatedSharedDevice) {
      throw new ConflictException('User device already shared with the user!');
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
      userDeviceRole: userDeviceRole,
      user: user,
    });

    return sharedDevice;
  }

  async findAll() {
    const sharedDevicesList = await this.sharedDeviceModel
      .createQueryBuilder('sharedDevice')
      .leftJoinAndSelect('sharedDevice.user', 'user')
      .leftJoinAndSelect('sharedDevice.device', 'device')
      .select(['sharedDevice', 'user.id', 'device.id'])
      .getMany();

    return sharedDevicesList;
  }

  async findOne(id: UUID) {
    const sharedDevice = await this.sharedDeviceModel
      .createQueryBuilder('sharedDevice')
      .leftJoinAndSelect('sharedDevice.user', 'user')
      .leftJoinAndSelect('sharedDevice.device', 'device')
      .select(['sharedDevice', 'user.id', 'device.id'])
      .where({ id })
      .getOne();

    return sharedDevice;
  }

  async update(id: UUID, updateSharedDeviceDto: UpdateSharedDeviceDto) {
    const shareDevice = await this.sharedDeviceModel.findOne({ where: { id } });

    if (!shareDevice) {
      throw new NotFoundException('Share device not found!');
    }

    const newShareDevice = {
      ...shareDevice,
      ...updateSharedDeviceDto,
    };

    const updateSharedDevice = this.sharedDeviceModel.update(
      { id },
      newShareDevice,
    );

    return updateSharedDevice;
  }

  async remove(id: UUID) {
    const shareDevice = await this.sharedDeviceModel.findOne({ where: { id } });

    if (!shareDevice) {
      throw new NotFoundException('Share device not found!');
    }

    await this.sharedDeviceModel.delete(shareDevice);

    return shareDevice;
  }
}
