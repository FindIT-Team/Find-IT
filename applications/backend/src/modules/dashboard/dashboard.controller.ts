// import { Controller, Get, Param, Post, Query } from '@nestjs/common';
// import { User } from '../../decorators/http/profile.decorator';
// import { NoticeEntity } from '../../entities/notice.entity';
// import { ProjectEntity } from '../../entities/project.entity';
// import { UserEntity } from '../../entities/profile.entity';
import { DashboardService } from './dashboard.service';
import { Controller } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  //   @Get('profile')
  //   async getUser(@User() profile: UserEntity): Promise<{
  //     id: string;
  //     username: string;
  //     subscription: { type: string; expiresIn: Date };
  //   }> {
  //     return await this.dashboardService.getUser(profile);
  //   }
  //
  //   @Get('notices')
  //   async getNotices(
  //     @Query() query: Record<string, any>,
  //     @User() profile: UserEntity,
  //   ): Promise<[NoticeEntity[], number]> {
  //     return await this.dashboardService.getNotices(profile.id, query);
  //   }
  //
  //   @Post('notices/:id')
  //   async noticesActions(
  //     @Param('id') noticeId: string,
  //     @Query('action') action: string,
  //     @User() profile: UserEntity,
  //   ): Promise<string> {
  //     switch (action) {
  //       case 'remove':
  //         return await this.dashboardService.removeNotice(profile.id, noticeId);
  //     }
  //   }
  //
  //   @Get('projects')
  //   async getProjects(
  //     @Query() query: Record<string, any>,
  //     @User() profile: UserEntity,
  //   ): Promise<[ProjectEntity[], number]> {
  //     return await this.dashboardService.getProjects(profile.id, query);
  //   }
  //
  //   @Get('responses-offers')
  //   async getResponsesOffers(
  //     @Query() query: Record<string, any>,
  //     @User() profile: UserEntity,
  //   ): Promise<[ProjectEntity[], number]> {
  //     return await this.dashboardService.getResponsesOffers(profile.id, query);
  //   }
}
