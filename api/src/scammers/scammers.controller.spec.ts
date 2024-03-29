import { Test, TestingModule } from '@nestjs/testing';
import { ScammersController } from './scammers.controller';
import { ScammersService } from './scammers.service';

describe('ScammersController', () => {
  let controller: ScammersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScammersController],
      providers: [ScammersService],
    }).compile();

    controller = module.get<ScammersController>(ScammersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
