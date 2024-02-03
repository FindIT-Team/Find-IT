import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AppleAuthGuard } from './guards/apple-auth.guard';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { YandexAuthGuard } from './guards/yandex-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { Session as Sess } from 'express-session';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(): Promise<void> {}

  @Post('registration')
  async registration(
    @Body() registerDto: RegisterDto,
    @Session() session: Sess,
  ): Promise<void> {
    return await this.authService.register(registerDto, session);
  }

  @Get('oauth/apple-auth')
  @UseGuards(AppleAuthGuard)
  async appleAuth(): Promise<void> {}

  @Get('oauth/apple-callback')
  @UseGuards(AppleAuthGuard)
  async appleCallback(): Promise<void> {}

  @Get('oauth/google-auth')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<void> {}

  @Get('oauth/google-callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(): Promise<void> {}

  @Get('oauth/yandex-auth')
  @UseGuards(YandexAuthGuard)
  async yandexAuth(): Promise<void> {}

  @Get('oauth/yandex-callback')
  @UseGuards(YandexAuthGuard)
  async yandexCallback(): Promise<void> {}

  @Get('oauth/github-auth')
  @UseGuards(GithubAuthGuard)
  async githubAuth(): Promise<void> {}

  @Get('oauth/github-callback')
  @UseGuards(GithubAuthGuard)
  async githubCallback(): Promise<void> {}
}
