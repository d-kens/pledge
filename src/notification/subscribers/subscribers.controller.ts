import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateSubscriberDto,
  CreateSubscriberResponse,
} from '../dto/subscriber.dto';
import { SubscribersService } from './subscribers.service';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  async createSubscriber(
    @Body() createSubscriberDto: CreateSubscriberDto,
  ): Promise<CreateSubscriberResponse> {
    return this.subscribersService.createSubscriber(createSubscriberDto);
  }
}
