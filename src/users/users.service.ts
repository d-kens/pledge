import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(
    options: IPaginationOptions,
    searchTerm?: string,
  ): Promise<Pagination<User>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (searchTerm) {
      const search = `%${searchTerm.toLowerCase()}%`;

      queryBuilder.andWhere(
        `LOWER(user.email) LIKE :search OR LOWER(user.firstName) LIKE :search OR LOWER(user.lastName) LIKE :search`,
        { search },
      );
    }

    return paginate<User>(this.usersRepository, options);
  }

  async findById(userId: number): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(userDto.email);

    if (existingUser) throw new ConflictException('User already exist');

    try {
      const hashedPassowrd = await hash(userDto.password, 10);

      const newUser = this.usersRepository.create({
        ...userDto,
        password: hashedPassowrd,
      });

      return this.usersRepository.save(newUser);
    } catch (error) {
      this.logger.error(
        `Failed to send notification: ${JSON.stringify(error)}`,
      );

      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }
  }
}
