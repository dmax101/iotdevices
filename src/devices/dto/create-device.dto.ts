import { IsString, IsUUID } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  type: string;
  
  @IsString()
  local: string;

  @IsString()
  name: string;

  @IsUUID()
  user_id: string;
}
