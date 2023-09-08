import { IsIn, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateSharedDeviceDto {
  @IsString()
  @IsIn(['owner', 'editor', 'viewer'], {
    message:
      "userDeviceRole invalid! The values must to be 'owner', 'editor' or 'viewer'. Optional value! Viewer is default value.",
  })
  userDeviceRole?: 'owner' | 'editor' | 'viewer';

  @IsUUID()
  user_id: UUID;

  @IsUUID()
  owner_id: UUID;

  @IsUUID()
  device_id: UUID;
}
