import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('otps')
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashedCode: string;

  @Column({ default: false })
  isUsed: boolean;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.otps, { onDelete: 'CASCADE' })
  user: User;
}
