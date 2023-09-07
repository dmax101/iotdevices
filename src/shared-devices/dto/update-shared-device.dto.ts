import { PartialType } from '@nestjs/mapped-types';
import { CreateSharedDeviceDto } from './create-shared-device.dto';

export class UpdateSharedDeviceDto extends PartialType(CreateSharedDeviceDto) {}
