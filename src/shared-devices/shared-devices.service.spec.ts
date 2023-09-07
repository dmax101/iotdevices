import { Test, TestingModule } from '@nestjs/testing';
import { SharedDevicesService } from './shared-devices.service';

describe('SharedDevicesService', () => {
  let service: SharedDevicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedDevicesService],
    }).compile();

    service = module.get<SharedDevicesService>(SharedDevicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
