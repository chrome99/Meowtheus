import { MeowService } from './meow.service';
import { Response } from 'express';
import { MeowEvent } from '../dto/meow-event';

describe('MeowService', () => {
  let service: MeowService;

  beforeEach(() => {
    service = new MeowService();
  });

  it('adds and removes clients', () => {
    const mockRes = { write: jest.fn() } as unknown as Response;

    service.addClient(mockRes);
    service.removeClient(mockRes);

    const writeFn = jest.fn();
    const client = { write: writeFn } as unknown as Response;

    service.addClient(client);
    service.broadcastMeow({
      catId: 'test',
      timestamp: new Date().toISOString(),
    });

    expect(writeFn).toHaveBeenCalledTimes(1);
  });

  it('broadcasts correct payload format', () => {
    const write = jest.fn();
    const client = { write } as unknown as Response;

    service.addClient(client);
    const meow: MeowEvent = {
      catId: 'test',
      timestamp: new Date().toISOString(),
    };
    service.broadcastMeow(meow);

    expect(write).toHaveBeenCalledWith(`data: ${JSON.stringify(meow)}\n\n`);
  });
});
