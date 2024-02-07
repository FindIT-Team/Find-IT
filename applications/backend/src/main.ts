import { NestFactory } from '@nestjs/core';
import passport from 'passport';
import { CorsConfig } from './configs/cors.config';
import { AppModule } from './modules/app.module';
import { AuthGuard } from './modules/auth/auth.guard';
import session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { StoreService } from './modules/store/store.service';
import { SessionConfig } from './configs/session.config';
import * as fs from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

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

  if (configService.get('NODE_ENV') === 'development') {
    const options = new DocumentBuilder()
      .setTitle('FindIT API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options, {
      ignoreGlobalPrefix: true,
    });
    fs.writeFileSync(
      path.join('postman', 'openapi.json'),
      JSON.stringify(document),
    );
    SwaggerModule.setup('/api/docs', app, document);
  }

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
