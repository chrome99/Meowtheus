import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Header,
  Req,
  HttpCode,
} from '@nestjs/common';
import { MeowService } from './meow.service';
import { Response, Request } from 'express';
import { MeowEvent } from '../dto/meow-event';

@Controller('meow')
export class MeowController {
  constructor(private readonly meowService: MeowService) {}

  @Post()
  @HttpCode(204)
  handleMeow(@Body() data: MeowEvent) {
    this.meowService.broadcastMeow(data);
  }

  @Get('stream')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  stream(@Req() req: Request, @Res() res: Response) {
    res.flushHeaders();
    this.meowService.addClient(res);

    req.on('close', () => {
      this.meowService.removeClient(res);
    });
  }
}
