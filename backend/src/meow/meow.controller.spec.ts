import { Test, TestingModule } from '@nestjs/testing';
import { MeowController } from './meow.controller';
import { MeowService } from './meow.service';
import { MeowEvent } from '../dto/meow-event';
import { Request, Response } from 'express';

describe('MeowController', () => {
  let controller: MeowController;
  let service: MeowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeowController],
      providers: [MeowService],
    }).compile();

    controller = module.get(MeowController);
    service = module.get(MeowService);
  });

  it('should forward meow event to service', () => {
    const meow: MeowEvent = {
      catId: 'felix',
      timestamp: new Date().toISOString(),
    };

    const spy = jest.spyOn(service, 'broadcastMeow');
    controller.handleMeow(meow);

    expect(spy).toHaveBeenCalledWith(meow);
  });

  it('should register and unregister clients on stream()', () => {
    const res = {
      flushHeaders: jest.fn(),
      write: jest.fn(),
    } as unknown as Response;

    const req = {
      on: jest.fn((event: string, handler: () => void) => {
        if (event === 'close') handler();
      }),
    } as unknown as Request;

    const addSpy = jest.spyOn(service, 'addClient');
    const removeSpy = jest.spyOn(service, 'removeClient');

    controller.stream(req, res);

    expect(res.flushHeaders).toHaveBeenCalled();
    expect(addSpy).toHaveBeenCalledWith(res);
    expect(removeSpy).toHaveBeenCalledWith(res);
  });
});
