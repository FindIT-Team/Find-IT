import { NestFactory } from '@nestjs/core';
import passport from 'passport';
import { CorsConfig } from './configs/cors.config';
import { AppModule } from './modules/app.module';
import { AuthGuard } from './modules/auth/auth.guard';
import session from 'express-session';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors(CorsConfig);

  app.use(
    session({
      secret: configService.get('SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24,
        domain: 'localhost',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalGuards(new AuthGuard());

  await app.listen(configService.get('PORT') ?? 3000);
}

bootstrap().then();
