import { Controller, Get, Post, Query } from '@nestjs/common';
import { User } from 'src/decorators/http/user.decorator';
import { Notice, Project, UsersToProjects } from '@prisma/client';
import { DashboardService } from './dashboard.service';
import { ApiConfig } from '../../configs/api.config';
import { AuthenticatedRequest } from '../../decorators/authenticated-request.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller(ApiConfig({ path: 'dashboard' }))
@AuthenticatedRequest()
@ApiTags('Dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('notices')
  async getNotices(
    @User() user: Express.User,
    @Query('offset') offset?: string,
  ): Promise<Notice[]> {
    return await this.dashboardService.getNotices(user.id, offset);
  }

  @Get('projects')
  async getProjects(
    @User() user: Express.User,
    @Query('offset') offset?: string,
  ): Promise<Project[]> {
    return await this.dashboardService.getProjects(user.id, offset);
  }

  @Get('responses-offers')
  async getResponsesOffers(
    @User() user: Express.User,
    @Query('offset') offset?: string,
  ): Promise<UsersToProjects[]> {
    return await this.dashboardService.getResponsesOffers(user.id, offset);
  }

  @Post()
  async create(@User() user: Express.User) {
    await this.dashboardService.create(user.id);
  }
}
