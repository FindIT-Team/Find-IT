FROM node:latest AS BASE
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

FROM base AS prod

RUN rm .env.development && rm .env.test && mv .env.production .env

ENV NODE_ENV=production

RUN npm run build

ENTRYPOINT [ "npm", "run", "start:prod" ]

FROM base AS dev

RUN rm .env.production && rm .env.test && mv .env.development .env

ENV NODE_ENV=development

ENTRYPOINT [ "npm", "run", "dev" ]

FROM base AS test

RUN rm .env.production && rm .env.development && mv .env.test .env

ENV NODE_ENV=test