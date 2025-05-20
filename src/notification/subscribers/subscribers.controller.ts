import { Body, Controller, Post } from '@nestjs/common';
import { SubscriberDto } from '../dto/subscriber.dto';
import { SubscribersService } from './subscribers.service';

@Controller('subscribers')
export class SubscribersController {
    constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  async createSubscriber(@Body() subscriber: SubscriberDto) {
    return this.subscribersService.createSubscriber(subscriber);
  }

  @Post('/bulk')
  async createBulkSubscribers(@Body() subscribers: SubscriberDto[]) {
    return this.subscribersService.createBulkSubscribers(subscribers);
  }

  @Post('/update')
  async updateSubscriber(@Body() subscriber: SubscriberDto) {
    return this.subscribersService.updateSubscriber(subscriber);
  }

  @Post('/delete')
  async deleteSubscriber(@Body() subscriberId: string) {
    return this.subscribersService.deleteSubscriber(subscriberId);
  }

  @Post('/get')
  async getSubscriber(@Body('subscriberId') subscriberId: string) {
    return this.subscribersService.getSubscriber(subscriberId);
  }

  @Post('/list')
  async getSubscribers() {
    return this.subscribersService.getSubscribers();
  }
}
