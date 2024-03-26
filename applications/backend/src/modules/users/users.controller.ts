import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthenticatedRequest } from '../../decorators/authenticated-request.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@Controller('users')
@AuthenticatedRequest()
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query() params: Record<string, string>) {
    const { offset, take } = params;
    return await this.usersService.getUsers(Number(take ?? 10), offset);
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return await this.usersService.getUser(username);
  }
}
