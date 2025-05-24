import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private usersService: UsersService) {}

  async register(userDto: CreateUserDto): Promise<User> {
    // Create user
    const user = await this.usersService.create(userDto);

    // Send email verification code
    // Return response to the client

    return user;
  }
}
