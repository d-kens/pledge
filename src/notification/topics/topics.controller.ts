import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Topic } from './topic';
import { TopicsService } from './topics.service';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post('')
  createTopic(@Body() topic: Topic) {
    return this.topicsService.createTopic(topic);
  }

  @Get('/')
  getAllTopics() {
    return this.topicsService.getAllTopics();
  }

  @Get('/:key')
  getTopicByKey(@Param('key') key: string) {
    return this.topicsService.getTopicByKey(key);
  }

  @Post('/:key/rename')
  renameTopic(@Param('key') key: string, @Body() topic: Topic) {
    return this.topicsService.renameTopic(topic);
  }

  @Post('/:key/subscribers')
  addSubscriberToTopic(
    @Param('key') key: string,
    @Body('subscriberIds') subscriberIds: string[],
  ) {
    return this.topicsService.addTopicSubscriber(key, subscriberIds);
  }

  @Get('subscribers')
  checkSubscriber(
    @Query('key') key: string,
    @Query('subscriberId') subscriberId: string,
  ) {
    return this.topicsService.checkTopicSubscriber(key, subscriberId);
  }

  @Post('/:key/subscribers/remove')
  removeSubscriberFromTopic(
    @Param('key') key: string,
    @Body('subscriberIds') subscriberIds: string[],
  ) {
    return this.topicsService.removeTopicSubscriber(key, subscriberIds);
  }

  @Post('/:key/send')
  sendTopicNotification(
    @Param('key') key: string,
    @Body('description') description: string,
  ) {
    return this.topicsService.sendTopicNotification(key, description);
  }

  @Post('/:key/delete')
  deleteTopic(@Param('key') key: string) {
    return this.topicsService.deleteTopic(key);
  }
}
