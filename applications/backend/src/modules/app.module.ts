import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { StoreConfigAsync } from '../configs/store.config';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    StoreModule.forRootAsync(StoreConfigAsync),
    AuthModule,
    HealthModule,
    DashboardModule,
  ],
})
export class AppModule {}
