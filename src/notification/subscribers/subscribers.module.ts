import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { ConfigModule } from '@nestjs/config';
import { NovuProvider } from '../novu/novu.provider';

@Module({
  imports: [ConfigModule],
  providers: [SubscribersService, NovuProvider],
  controllers: [SubscribersController]
})
export class SubscribersModule {}
