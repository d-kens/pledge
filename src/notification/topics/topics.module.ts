import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { NovuProvider } from '../novu/novu.provider';

@Module({
  providers: [TopicsService, NovuProvider],
  controllers: [TopicsController]
})
export class TopicsModule {}
