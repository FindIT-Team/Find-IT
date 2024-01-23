FROM node:latest AS BASE
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

FROM base AS prod

RUN rm .env.development && rm .env.test && mv .env.production .env

ENV NODE_ENV=production

RUN npm run build

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost:4000/api/health || exit 1

ENTRYPOINT [ "npm", "run", "start:prod" ]

FROM base AS dev

RUN rm .env.production && rm .env.test && mv .env.development .env

ENV NODE_ENV=development

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost:4000/api/health || exit 1

ENTRYPOINT [ "npm", "run", "dev" ]

FROM base AS test
LABEL env=test

RUN rm .env.production && rm .env.development && mv .env.test .env

ENV NODE_ENV=test