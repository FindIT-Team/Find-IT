import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthSerializer } from './auth.serializer';
import { GoogleStrategy } from './strategies/google.strategy';
import { YandexStrategy } from './strategies/yandex.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { AuthGateway } from './auth.gateway';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [DatabaseModule, PassportModule.register({ session: true })],
  providers: [
    AuthService,
    AuthSerializer,
    AuthGateway,
    LocalStrategy,
    // TODO: Apple auth strategy
    // AppleStrategy,
    GoogleStrategy,
    YandexStrategy,
    GithubStrategy,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
