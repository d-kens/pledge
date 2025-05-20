import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { NotificationDto } from '../dto/notification.dto';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post('send')
    sendEmail(@Body() notification: NotificationDto) {
        return this.messagesService.sendNotification(notification)
    }
}
