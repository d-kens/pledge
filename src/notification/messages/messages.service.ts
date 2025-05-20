import { Injectable } from '@nestjs/common';
import { InjectNovu } from '../novu/novu.provider';
import { Novu } from '@novu/node';
import { NotificationDto } from '../dto/notification.dto';

@Injectable()
export class MessagesService {
    constructor(@InjectNovu() private readonly novu: Novu) {}

    async sendNotification(notification: NotificationDto) {
        try {
            const result = await this.novu.trigger(notification.workflowId, {
                to: { subscriberId: notification.subscriberId },
                payload: notification.payload
            })

        } catch (error) {
            return { message: error.message }
        }
    }
}
