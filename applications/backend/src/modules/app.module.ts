import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from '../configs/typeorm.config';
import { NoticesModule } from './notices/notices.module';
import { ProjectsToUsersModule } from './projects-to-users/projects-to-users.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { StoreConfigAsync } from '../configs/store.config';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
    StoreModule.forRootAsync(StoreConfigAsync),
    AuthModule,
    HealthModule,
    UsersModule,
    NoticesModule,
    ProjectsModule,
    ProjectsToUsersModule,
    DashboardModule,
  ],
})
export class AppModule {}
