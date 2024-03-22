import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  Notice,
  NoticeType,
  Prisma,
  Project,
  UsersToProjects,
  UsersToProjectsStatus,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

@Injectable()
export class DashboardService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getNotices(userId: string, offset?: string): Promise<Notice[]> {
    return await this.databaseService.notice.findMany({
      where: { userId },
      orderBy: { createdAt: Prisma.SortOrder.desc },
      cursor: offset ? { id: offset } : undefined,
      skip: offset ? 1 : 0,
      take: offset ? 10 : 20,
    });
  }

  async getProjects(userId: string, offset?: string): Promise<Project[]> {
    return await this.databaseService.project.findMany({
      where: {
        users: {
          some: { userId, status: UsersToProjectsStatus.JOINED },
        },
      },
      include: {
        users: {
          where: { isOwner: true },
          select: { user: { select: { username: true } } },
        },
        rating: {
          select: { mark: true },
        },
        _count: {
          select: { users: true },
        },
      },
      orderBy: {
        updatedAt: Prisma.SortOrder.desc,
      },
      cursor: offset ? { id: offset } : undefined,
      skip: offset ? 1 : 0,
      take: 10,
    });
  }

  async getResponsesOffers(
    userId: string,
    offset?: string,
  ): Promise<UsersToProjects[]> {
    return await this.databaseService.usersToProjects.findMany({
      where: {
        userId,
        status: {
          notIn: [UsersToProjectsStatus.JOINED, UsersToProjectsStatus.DECLINED],
        },
      },
      orderBy: {},
      cursor: offset ? { id: offset } : undefined,
      skip: offset ? 1 : 0,
      take: 10,
      include: {
        project: {
          include: {
            users: {
              where: { isOwner: true },
              select: { user: { select: { username: true } } },
            },
            rating: {
              select: { mark: true },
            },
            _count: {
              select: { users: true },
            },
          },
        },
      },
    });
  }

  async create(userId: string): Promise<void> {
    for (let i = 0; i < 10; i++)
      await this.databaseService.notice.create({
        data: {
          message: faker.lorem.sentence(),
          type: NoticeType.SECURITY,
          userId,
        },
      });
  }
}
