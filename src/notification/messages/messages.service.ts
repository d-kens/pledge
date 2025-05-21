import { Novu } from '@novu/api';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { NotificationDto } from '../dto/notification.dto';
import * as process from 'process';
import { TriggerResponse } from '../dto/trigger-response';

@Injectable()
export class MessagesService {
  private readonly novu: Novu;
  private readonly logger = new Logger(MessagesService.name);

  constructor() {
    this.novu = new Novu({
      secretKey: process.env.NOVU_API_KEY,
    });
  }

  async sendNotification(
    notification: NotificationDto,
  ): Promise<TriggerResponse> {
    try {
      const response = await this.novu.trigger({
        workflowId: notification.workflowId,
        to: { subscriberId: notification.subscriberId },
        payload: notification.payload,
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
