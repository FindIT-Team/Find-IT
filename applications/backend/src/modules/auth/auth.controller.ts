import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { UsernameAvailableDto } from './dto/username-available.dto';
import { ApiConfig } from '../../configs/api.config';

@Controller(ApiConfig({ path: 'auth' }))
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: AuthDto })
  @ApiOkResponse({ description: 'User logged in' })
  async login(): Promise<void> {}

  @Post('registration')
  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ description: 'User registered' })
  async registration(
    @Session() session: Sess,
    @Body() registerDto: RegisterDto,
  ): Promise<void> {
    return await this.authService.register(session, registerDto);
  }

  @Get('available-username/:username')
  @ApiOperation({ summary: 'Check username availability' })
  @ApiOkResponse({
    description: 'Username available status',
    type: UsernameAvailableDto,
  })
  async isUsernameAvailable(
    @Param('username') username: string,
  ): Promise<UsernameAvailableDto> {
    return await this.authService.isUsernameAvailable(username);
  }

  @Get('oauth/apple-auth')
  @UseGuards(AppleAuthGuard)
  @ApiOperation({ summary: 'Apple oauth authentication' })
  @ApiResponse({ status: 301, description: 'Redirect to apple' })
  async appleAuth(): Promise<void> {}

  @Get('oauth/apple-callback')
  @UseGuards(AppleAuthGuard)
  @ApiOperation({ summary: 'Apple oauth callback' })
  @ApiResponse({ status: 301, description: 'Redirect back' })
  async appleCallback(): Promise<void> {}

  @Get('oauth/google-auth')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google oauth authentication' })
  @ApiResponse({ status: 301, description: 'Redirect to google' })
  async googleAuth(): Promise<void> {}

  @Get('oauth/google-callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Google oauth callback' })
  @ApiResponse({ status: 301, description: 'Redirect back' })
  async googleCallback(): Promise<void> {}

  @Get('oauth/yandex-auth')
  @UseGuards(YandexAuthGuard)
  @ApiOperation({ summary: 'Yandex oauth authentication' })
  @ApiResponse({ status: 301, description: 'Redirect to yandex' })
  async yandexAuth(): Promise<void> {}

  @Get('oauth/yandex-callback')
  @UseGuards(YandexAuthGuard)
  @ApiOperation({ summary: 'Yandex oauth callback' })
  @ApiResponse({ status: 301, description: 'Redirect back' })
  async yandexCallback(): Promise<void> {}

  @Get('oauth/github-auth')
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: 'Github oauth authentication' })
  @ApiResponse({ status: 301, description: 'Redirect to github' })
  async githubAuth(): Promise<void> {}

  @Get('oauth/github-callback')
  @UseGuards(GithubAuthGuard)
  @ApiOperation({ summary: 'Github oauth callback' })
  @ApiResponse({ status: 301, description: 'Redirect back' })
  async githubCallback(): Promise<void> {}
}
