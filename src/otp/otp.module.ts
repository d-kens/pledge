import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from 'src/entity/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  providers: [OtpService],
  controllers: [OtpController],
})
export class OtpModule {}
