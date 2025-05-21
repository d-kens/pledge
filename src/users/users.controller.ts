import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponsedto } from 'src/dto/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('searchTerm') searchTerm?: string,
  ) {
    limit = limit > 100 ? 100 : limit;
    const result = await this.usersService.findAll({ page, limit }, searchTerm);

    return {
      ...result,
      items: result.items.map((user) => new UserResponsedto(user)),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.usersService.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return new UserResponsedto(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.usersService.delete(id);
  }
}
