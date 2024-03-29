import { Test, TestingModule } from '@nestjs/testing';
import { ScammersService } from './scammers.service';

describe('ScammersService', () => {
  let service: ScammersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScammersService],
    }).compile();

    service = module.get<ScammersService>(ScammersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
