import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../../entities/project.entity';
import { ProjectsToUsersModule } from '../projects-to-users/projects-to-users.module';
import { ProjectsService } from './projects.service';
import { ProjectsGateway } from './projects.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), ProjectsToUsersModule],
  providers: [ProjectsService, ProjectsGateway],
  exports: [ProjectsService],
})
export class ProjectsModule {}
