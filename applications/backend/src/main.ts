import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { StoreService } from './modules/store/store.service';
import { createDocs } from './utils/create-docs.util';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsConfig } from './configs/cors.config';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './modules/auth/auth.guard';
import session from 'express-session';
import { SessionConfig } from './configs/session.config';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: false,
  });

  const configService = app.get(ConfigService);
  const storeService = app.get(StoreService);

  app.enableCors(CorsConfig);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');

  if (configService.get('NODE_ENV') === 'development') await createDocs(app);

  app.use(
    session({
      ...SessionConfig,
      store: storeService.session,
      secret: configService.get('SECRET'),
    }),
  );
  app.use(passport.session());

  app.useGlobalGuards(new AuthGuard());

  await app.listen(configService.get('PORT'));
}

bootstrap().then();
