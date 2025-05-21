import { Module } from '@nestjs/common';
import { MessagesModule } from './notification/messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { SubscribersModule } from './notification/subscribers/subscribers.module';
import { TopicsModule } from './notification/topics/topics.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MessagesModule,
    SubscribersModule,
    TopicsModule,
    UsersModule
  ],
})
export class AppModule {}
