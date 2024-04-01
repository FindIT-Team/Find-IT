import { Controller, Get, Post, Query } from '@nestjs/common';
import { User } from 'src/decorators/http/user.decorator';
import { Notice, Project, UsersToProjects } from '@prisma/client';
import { DashboardService } from './dashboard.service';
import { AuthenticatedRequest } from '../../decorators/authenticated-request.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('dashboard')
@AuthenticatedRequest()
@ApiTags('Dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('notices')
  async getNotices(
    @User() user: Express.User,
    @Query() params: Record<string, string>,
  ): Promise<Notice[]> {
    const { offset, take } = params;
    return await this.dashboardService.getNotices(
      user.id,
      Number(take ?? 10),
      offset,
    );
  }

  @Get('projects')
  async getProjects(
    @User() user: Express.User,
    @Query() params: Record<string, string>,
  ): Promise<Project[]> {
    const { offset, take } = params;
    return await this.dashboardService.getProjects(
      user.id,
      Number(take ?? 10),
      offset,
    );
  }

  @Get('responses-offers')
  async getResponsesOffers(
    @User() user: Express.User,
    @Query() params: Record<string, string>,
  ): Promise<UsersToProjects[]> {
    const { offset, take } = params;
    return await this.dashboardService.getResponsesOffers(
      user.id,
      Number(take ?? 10),
      offset,
    );
  }

  @Post()
  async create(@User() user: Express.User) {
    await this.dashboardService.create(user.id);
  }
}
