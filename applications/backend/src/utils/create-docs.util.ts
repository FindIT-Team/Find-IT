import fs from 'fs';
import path from 'path';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createDocs = async (app: INestApplication) => {
  await createHttpDocs(app);
  // await createAsyncDocs(app);
};

const createHttpDocs = async (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('FindIT API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup(`/docs`, app, document);

  fs.writeFileSync(path.join('openapi.json'), JSON.stringify(document));
};

// const createAsyncDocs = async (app: INestApplication) => {
//   const options = new AsyncApiDocumentBuilder()
//     .setTitle('FindIT API')
//     .setVersion('1.0')
//     .setDefaultContentType('application/json')
//     .build();
//
//   const document = AsyncApiModule.createDocument(app, options, {
//     ignoreGlobalPrefix: true,
//   });
//
//   await AsyncApiModule.setup('/api/async-docs', app, document);
//
//   fs.writeFileSync(path.join('postman', 'ws.json'), JSON.stringify(document));
// };
