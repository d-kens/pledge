import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { NovuProvider } from '../novu/novu.provider';

@Module({
  providers: [MessagesService, NovuProvider],
  controllers: [MessagesController]
})
export class MessagesModule {}
