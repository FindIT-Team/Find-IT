import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigAsync } from '../configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NoticesModule } from './notices/notices.module';
import { ProjectsToUsersModule } from './projects-to-users/projects-to-users.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env.development'],
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
    AuthModule,
    UsersModule,
    NoticesModule,
    ProjectsModule,
    ProjectsToUsersModule,
    DashboardModule,
  ],
  providers: [
    // AppGateway
  ],
})
export class AppModule {}
