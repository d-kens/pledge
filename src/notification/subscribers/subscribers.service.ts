import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Novu } from '@novu/api';
import {
  CreateSubscriberDto,
  CreateSubscriberResponse,
} from '../dto/subscriber.dto';
import { SubscribersControllerCreateSubscriberResponse } from '@novu/api/models/operations';
import * as process from 'process';

@Injectable()
export class SubscribersService {
  private readonly novu: Novu;
  private readonly logger = new Logger(SubscribersService.name);

  constructor() {
    this.novu = new Novu({
      secretKey: process.env.NOVU_API_KEY,
    });
  }

  async createSubscriber(
    createSubscriberDto: CreateSubscriberDto,
  ): Promise<CreateSubscriberResponse> {
    try {
      const response: SubscribersControllerCreateSubscriberResponse =
        await this.novu.subscribers.create({
          subscriberId: createSubscriberDto.subscriberId,
          firstName: createSubscriberDto.firstName,
          lastName: createSubscriberDto.lastName,
          email: createSubscriberDto.email,
          phone: createSubscriberDto.phone,
          avatar: createSubscriberDto.avatar,
          locale: createSubscriberDto.locale,
          timezone: createSubscriberDto.timezone,
          data: createSubscriberDto.data,
        });

      return response.result;
    } catch (error) {
      this.logger.error(
        `Failed to send notification: ${JSON.stringify(error)}`,
      );

      throw new InternalServerErrorException('Error sending notification');
    }
  }
}
