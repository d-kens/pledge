import { RoleEnum } from 'src/enum/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Otp } from './otp.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstname', type: 'varchar', length: 60 })
  firstName: string;

  @Column({ name: 'lastname', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  phoneNumber: string;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  @Column({ nullable: true })
  refreshToken: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Otp, (otp) => otp.user)
  otps: Otp[];
}
