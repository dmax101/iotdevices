import { IsString } from 'class-validator';

export class CreateSharedDeviceDto {
  @IsString()
  deviceRole: 'owner' | 'editor' | 'viewer';

  @IsString()
  user_id: string;

  @IsString()
  device_id: string;
}
