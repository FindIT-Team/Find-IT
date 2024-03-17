import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { $Enums, Notice, Prisma, Project } from '@prisma/client';

@Injectable()
export class DashboardService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getNotices(userId: string, offset?: string): Promise<Notice[]> {
    return await this.databaseService.notice.findMany({
      where: { userId },
      orderBy: { createdAt: Prisma.SortOrder.desc },
      cursor: offset ? { id: offset } : undefined,
      skip: offset ? 1 : 0,
      take: 15,
    });
  }

  async getProjects(userId: string, offset?: string): Promise<Project[]> {
    return await this.databaseService.project.findMany({
      where: {
        users: {
          some: { userId, status: $Enums.UsersToProjectsStatus.JOINED },
        },
      },
      orderBy: {
        // updatedAt: Prisma.SortOrder.desc,
      },
      cursor: offset ? { id: offset } : undefined,
      skip: offset ? 1 : 0,
      take: 10,
    });
  }

  async getResponsesOffers(
    userId: string,
    offset?: string,
  ): Promise<Project[]> {
    return await this.databaseService.project.findMany({
      where: {
        users: {
          some: {
            userId,
            status: { not: $Enums.UsersToProjectsStatus.JOINED },
          },
        },
      },
      orderBy: {},
      cursor: offset ? { id: offset } : undefined,
      skip: offset ? 1 : 0,
      take: 10,
    });
  }
}
