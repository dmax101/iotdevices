import { UUID } from 'crypto';
import { SharedDeviceModel } from 'src/shared-devices/entities/shared-device.entity';
import { UserModel } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
@Unique(['id'])
export class DeviceModel {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ type: 'varchar', length: 300 })
  type: string;

  @Column({ type: 'varchar', length: 300 })
  local: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @ManyToOne(() => UserModel, (user) => user.devices)
  user: UserModel;

  @OneToMany(() => SharedDeviceModel, (sharedDevice) => sharedDevice.device)
  sharedWithUsers: SharedDeviceModel[];
}
