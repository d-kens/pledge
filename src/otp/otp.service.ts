import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Otp } from 'src/entity/otp.entity';
import { User } from 'src/entity/user.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  private readonly OTP_EXPIRY_MINUTES = 10;
  private readonly MAX_FAILED_ATTEMPTS = 5;
  private readonly RATE_LIMIT_WINDOW_MINUTES = 15;

  constructor(
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  ) {}

  private generateRandomOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async checkRateLimit(user: User): Promise<void> {
    const rateLimitWindow = new Date(
      Date.now() - this.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
    );

    const recentFailedAttempts = await this.otpRepository.count({
      where: {
        user,
        createdAt: MoreThan(rateLimitWindow),
      },
    });

    if (recentFailedAttempts >= this.MAX_FAILED_ATTEMPTS) {
      this.logger.warn(`Rate limit exceeded for user ${user.id}`);
      throw new BadRequestException(
        'Too many failed attempts. Please try again later.',
      );
    }
  }

  async generateOtp(user: User): Promise<string> {
    try {
      return await this.otpRepository.manager.transaction(async (manager) => {
        // Revoke all existing OTPs for the user
        await manager.update(
          Otp,
          {
            user,
            isUsed: false,
          },
          { isUsed: true },
        );

        const code = this.generateRandomOTP();
        const hashedCode = await bcrypt.hash(code, 12);
        const expiresAt = new Date(
          Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000,
        );

        const otpEntity = manager.create(Otp, {
          user,
          hashedCode,
          expiresAt,
          isUsed: false,
        });

        await manager.save(otpEntity);

        this.logger.log(`OTP generated for user ${user.id}`);
        return code;
      });
    } catch (error) {
      this.logger.error(`Failed to generate OTP for user ${user.id}`, error);
      throw new InternalServerErrorException(
        'Failed to generate OTP. Please try again.',
      );
    }
  }

  async verifyOtp(user: User, code: string): Promise<boolean> {
    try {
      await this.checkRateLimit(user);

      const otp = await this.otpRepository.findOne({
        where: {
          user,
          isUsed: false,
          expiresAt: MoreThan(new Date()),
        },
        order: { createdAt: 'DESC' },
      });

      if (!otp) {
        this.logger.warn(`No valid OTP found for user ${user.id}`);
        throw new BadRequestException('Invalid or expired OTP');
      }

      const isMatch = await bcrypt.compare(code, otp.hashedCode);

      if (!isMatch) {
        this.logger.warn(`Invalid OTP attempt for user ${user.id}`);
        throw new BadRequestException('Invalid or expired OTP');
      }

      await this.otpRepository.manager.transaction(async (manager) => {
        otp.isUsed = true;
        await manager.save(otp);
      });

      this.logger.log(`OTP verified successfully for user ${user.id}`);
      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      this.logger.error(`OTP verification failed for user ${user.id}`, error);
      throw new InternalServerErrorException(
        'OTP verification failed. Please try again.',
      );
    }
  }

  async cleanupExpiredOtps(): Promise<number> {
    // TODO: Implement a CRON job for this
    try {
      const result = await this.otpRepository.delete({
        expiresAt: LessThan(new Date()),
      });

      const deletedCount = result.affected || 0;

      if (deletedCount > 0) {
        this.logger.log(`Cleaned up ${deletedCount} expired OTPs`);
      }

      return deletedCount;
    } catch (error) {
      this.logger.error('Failed to cleanup expired OTPs', error);
      return 0;
    }
  }

  async revokeUserOtps(user: User): Promise<void> {
    await this.otpRepository.update(
      { user, isUsed: false, expiresAt: MoreThan(new Date()) },
      { isUsed: true },
    );

    this.logger.log(`Revoked OTPs for user ${user.id}`);
  }
}
