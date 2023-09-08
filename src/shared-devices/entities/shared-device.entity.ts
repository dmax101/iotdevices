import { IsString } from 'class-validator';
import { DeviceModel } from 'src/devices/entities/device.entity';
import { UserModel } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['id'])
export class SharedDeviceModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: 'viewer'})
  @IsString()
  deviceRole: 'owner' | 'editor' | 'viewer';

  @ManyToOne(() => UserModel, (user) => user.sharedDevices)
  user: UserModel;

  @ManyToOne(() => DeviceModel, (device) => device.sharedWithUsers)
  device: DeviceModel;
}
