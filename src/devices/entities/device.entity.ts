import { UUID } from 'crypto';
import { UserModel } from 'src/users/user.model';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  Not,
  IsNull,
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
}
