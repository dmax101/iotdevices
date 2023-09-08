import { SetMetadata } from '@nestjs/common';

export const DeviceRole = (deviceRole) => SetMetadata('device-role', deviceRole);
