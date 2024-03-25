import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUsers(take: number, offset?: string) {
    return await this.databaseService.user.findMany({
      orderBy: { updatedAt: Prisma.SortOrder.desc },
      select: { id: true, username: true, profile: { include: {} } },
      cursor: offset ? { id: offset } : undefined,
      skip: offset ? 1 : 0,
      take,
    });
  }

  async getUser(username: string) {
    return await this.databaseService.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        profile: {
          include: {
            contacts: { select: { email: true, phone: true, telegram: true } },
            skills: {
              select: {
                frontend: true,
                backend: true,
                qa: true,
                devOps: true,
                machineLearning: true,
                projectManagement: true,
              },
            },
            extraContacts: true,
            extraSkills: true,
          },
        },
        projects: {
          select: {
            isOwner: true,
            project: {
              select: {
                slug: true,
                title: true,
                description: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }
}
