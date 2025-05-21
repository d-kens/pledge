import { Module } from '@nestjs/common';
import { MessagesModule } from './notification/messages/messages.module';
import { ConfigModule } from '@nestjs/config';
import { SubscribersModule } from './notification/subscribers/subscribers.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATASOURCE_HOST,
      port: parseInt(process.env.DATASOURCE_PORT || '3306', 10),
      username: process.env.DATASOURCE_USERNAME,
      password: process.env.DATASOURCE_PASSWORD,
      database: process.env.DATASOURCE_DATABASE,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    MessagesModule,
    SubscribersModule,
    UsersModule,
  ],
})
export class AppModule {}
