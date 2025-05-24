import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { OtpModule } from 'src/otp/otp.module';
import { MessagesModule } from 'src/notification/messages/messages.module';
import { SubscribersModule } from 'src/notification/subscribers/subscribers.module';

@Module({
  imports: [UsersModule, OtpModule, MessagesModule, SubscribersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
