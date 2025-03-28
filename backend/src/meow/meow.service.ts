import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { MeowEvent } from '../dto/meow-event';

@Injectable()
export class MeowService {
  private clients: Response[] = [];

  addClient(res: Response) {
    this.clients.push(res);
  }

  removeClient(res: Response) {
    this.clients = this.clients.filter((c) => c !== res);
  }

  broadcastMeow(data: MeowEvent) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    for (const client of this.clients) {
      client.write(payload);
    }
  }
}
