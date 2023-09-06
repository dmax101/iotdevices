import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { DeviceModel } from 'src/devices/entities/device.entity';

@Entity()
@Unique(['email'])
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 300 })
  lastName: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password: string;

  @OneToMany(() => DeviceModel, (device) => device.user)
  devices: DeviceModel[];
}