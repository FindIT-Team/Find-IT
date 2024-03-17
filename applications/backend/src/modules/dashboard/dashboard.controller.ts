// import { Controller, Get, Param, Post, Query } from '@nestjs/common';
// import { User } from '../../decorators/http/user.decorator';
// import { NoticeEntity } from '../../entities/notice.entity';
// import { ProjectEntity } from '../../entities/project.entity';
// import { UserEntity } from '../../entities/user.entity';
import { Notice, Project } from '@prisma/client';
import { DashboardService } from './dashboard.service';
import { Controller, Get, Query } from '@nestjs/common';
import { User } from 'src/decorators/http/user.decorator';

@Controller('dashboard')
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
  ): Promise<Project[]> {
    return await this.dashboardService.getResponsesOffers(user.id, offset);
  }
}
