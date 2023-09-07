import { Test, TestingModule } from '@nestjs/testing';
import { SharedDevicesController } from './shared-devices.controller';
import { SharedDevicesService } from './shared-devices.service';

describe('SharedDevicesController', () => {
  let controller: SharedDevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedDevicesController],
      providers: [SharedDevicesService],
    }).compile();

    controller = module.get<SharedDevicesController>(SharedDevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
