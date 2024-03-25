import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  Notice,
  Prisma,
  Project,
  UsersToProjects,
  UsersToProjectsStatus,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import slug from 'slug';

@Injectable()
export class DashboardService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getNotices(
    userId: string,
    take: number,
    offset?: string,
  ): Promise<Notice[]> {
    return await this.databaseService.notice.findMany({
      where: { userId },
      orderBy: { createdAt: Prisma.SortOrder.desc },
      cursor: offset ? { id: offset } : undefined,
      skip: offset ? 1 : 0,
      take,
    });
  }

  async getProjects(
    userId: string,
    take: number,
    offset?: string,
  ): Promise<Project[]> {
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
      take,
    });
  }

  async getResponsesOffers(
    userId: string,
    take: number,
    offset?: string,
  ): Promise<UsersToProjects[]> {
    return await this.databaseService.usersToProjects.findMany({
      where: {
        userId,
        status: {
          notIn: [UsersToProjectsStatus.JOINED, UsersToProjectsStatus.DECLINED],
        },
      },
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
      orderBy: {},
      cursor: offset ? { id: offset } : undefined,
      skip: offset ? 1 : 0,
      take,
    });
  }

  async create(userId: string): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const title = faker.lorem.sentence();
      await this.databaseService.project.create({
        data: {
          title,
          description: faker.lorem.paragraph(),
          slug: slug(title),
          users: {
            create: {
              userId,
              isOwner: true,
              status: UsersToProjectsStatus.JOINED,
            },
          },
        },
      });
    }
  }
}
