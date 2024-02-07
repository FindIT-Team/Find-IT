// import { Controller, Get, Param, Post, Query } from '@nestjs/common';
// import { User } from '../../decorators/http/user.decorator';
// import { NoticeEntity } from '../../entities/notice.entity';
// import { ProjectEntity } from '../../entities/project.entity';
// import { UserEntity } from '../../entities/user.entity';
import { DashboardService } from './dashboard.service';
import { Controller } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  //   @Get('user')
  //   async getUser(@User() user: UserEntity): Promise<{
  //     id: string;
  //     username: string;
  //     subscription: { type: string; expiresIn: Date };
  //   }> {
  //     return await this.dashboardService.getUser(user);
  //   }
  //
  //   @Get('notices')
  //   async getNotices(
  //     @Query() query: Record<string, any>,
  //     @User() user: UserEntity,
  //   ): Promise<[NoticeEntity[], number]> {
  //     return await this.dashboardService.getNotices(user.id, query);
  //   }
  //
  //   @Post('notices/:id')
  //   async noticesActions(
  //     @Param('id') noticeId: string,
  //     @Query('action') action: string,
  //     @User() user: UserEntity,
  //   ): Promise<string> {
  //     switch (action) {
  //       case 'remove':
  //         return await this.dashboardService.removeNotice(user.id, noticeId);
  //     }
  //   }
  //
  //   @Get('projects')
  //   async getProjects(
  //     @Query() query: Record<string, any>,
  //     @User() user: UserEntity,
  //   ): Promise<[ProjectEntity[], number]> {
  //     return await this.dashboardService.getProjects(user.id, query);
  //   }
  //
  //   @Get('responses-offers')
  //   async getResponsesOffers(
  //     @Query() query: Record<string, any>,
  //     @User() user: UserEntity,
  //   ): Promise<[ProjectEntity[], number]> {
  //     return await this.dashboardService.getResponsesOffers(user.id, query);
  //   }
}
