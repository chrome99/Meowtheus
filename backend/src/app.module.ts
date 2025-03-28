import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeowController } from './meow/meow.controller';
import { MeowService } from './meow/meow.service';

@Module({
  imports: [],
  controllers: [AppController, MeowController],
  providers: [AppService, MeowService],
})
export class AppModule {}
