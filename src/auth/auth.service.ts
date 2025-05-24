import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { MessagesService } from 'src/notification/messages/messages.service';
import { SubscribersService } from 'src/notification/subscribers/subscribers.service';
import { OtpService } from 'src/otp/otp.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private otpService: OtpService,
    private usersService: UsersService,
    private messageService: MessagesService,
    private subscribersService: SubscribersService,
  ) {}

  async register(userDto: CreateUserDto): Promise<User> { // TODO: Optimize.
    const user = await this.usersService.create(userDto);
    const otp = await this.otpService.generateOtp(user);

    await this.subscribersService.createSubscriber({
      subscriberId: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phoneNumber,
    });

    await this.messageService.sendNotification({
      subscriberId: user.email,
      workflowId: 'verify-email',
      to: { subscriberId: user.email },
      payload: {
        otpCode: otp,
        userName: `${user.firstName} ${user.lastName}`,
      },
    });

    return user;
  }
}
