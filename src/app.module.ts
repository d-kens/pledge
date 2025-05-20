import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './notification/messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { SubscribersModule } from './notification/subscribers/subscribers.module';
import { TopicsModule } from './notification/topics/topics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    MessagesModule,
    SubscribersModule,
    TopicsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
