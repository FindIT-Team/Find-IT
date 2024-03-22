import { Controller, Get, Query } from '@nestjs/common';
import { User } from 'src/decorators/http/user.decorator';
import { Notice, Project, UsersToProjects } from '@prisma/client';
import { DashboardService } from './dashboard.service';
import { ApiConfig } from '../../configs/api.config';

@Controller(ApiConfig({ path: 'dashboard' }))
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
}
