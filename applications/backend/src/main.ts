import { NestFactory } from '@nestjs/core';
import passport from 'passport';
import { CorsConfig } from './configs/cors.config';
import { AppModule } from './modules/app.module';
import { AuthGuard } from './modules/auth/auth.guard';
import session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors(CorsConfig);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('FindIT API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('/api/docs', app, document);

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
  app.use(passport.session());

  app.useGlobalGuards(new AuthGuard());

  await app.listen(configService.get('PORT') ?? 3000);
}

bootstrap().then();
