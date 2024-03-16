import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { UserEntity } from '../../entities/user.entity';
import { NoticeEntity } from '../../entities/notice.entity';
import { ProjectEntity } from '../../entities/project.entity';
import { NoticesModule } from '../notices/notices.module';
import { ProjectsModule } from '../projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from '../../configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { ProjectsToUsersModule } from '../projects-to-users/projects-to-users.module';
import { UsersModule } from '../users/users.module';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
        UsersModule,
        NoticesModule,
        ProjectsModule,
        ProjectsToUsersModule,
      ],
      controllers: [DashboardController],
      providers: [DashboardService],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  it('should return profile details', async () => {
    const user: UserEntity = new UserEntity();
    user.id = '1';
    user.username = 'test';
    user.subscription = { type: 'premium', expiresIn: new Date() };

    jest.spyOn(service, 'getUser').mockImplementation(async () => user);

    expect(await controller.getUser(user)).toBe(user);
  });

  it('should return notices', async () => {
    const user: UserEntity = new UserEntity();
    user.id = '1';

    const notices: NoticeEntity[] = [new NoticeEntity(), new NoticeEntity()];
    const query = {};

    jest
      .spyOn(service, 'getNotices')
      .mockImplementation(async () => [notices, notices.length]);

    expect(await controller.getNotices(query, user)).toEqual([
      notices,
      notices.length,
    ]);
  });

  it('should remove a notice', async () => {
    const user: UserEntity = new UserEntity();
    user.id = '1';

    const noticeId = '1';
    const action = 'remove';

    jest
      .spyOn(service, 'removeNotice')
      .mockImplementation(async () => 'Notice removed');

    expect(await controller.noticesActions(noticeId, action, user)).toBe(
      'Notice removed',
    );
  });

  it('should return projects', async () => {
    const user: UserEntity = new UserEntity();
    user.id = '1';

    const projects: ProjectEntity[] = [
      new ProjectEntity(),
      new ProjectEntity(),
    ];
    const query = {};

    jest
      .spyOn(service, 'getProjects')
      .mockImplementation(async () => [projects, projects.length]);

    expect(await controller.getProjects(query, user)).toEqual([
      projects,
      projects.length,
    ]);
  });

  it('should return responses offers', async () => {
    const user: UserEntity = new UserEntity();
    user.id = '1';

    const projects: ProjectEntity[] = [
      new ProjectEntity(),
      new ProjectEntity(),
    ];
    const query = {};

    jest
      .spyOn(service, 'getResponsesOffers')
      .mockImplementation(async () => [projects, projects.length]);

    expect(await controller.getResponsesOffers(query, user)).toEqual([
      projects,
      projects.length,
    ]);
  });
});
