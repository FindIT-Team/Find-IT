FROM node:latest AS BASE
WORKDIR /app

COPY package*.json ./

RUN npm i

RUN npx next telemetry disable

COPY . .

FROM base AS prod

RUN mv .env.development .env

ENV NODE_ENV=production
ENV API_ENDPOINT=http://backend:4000/api

RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]

FROM base AS dev

RUN mv .env.development .env

ENV NODE_ENV=development

ENTRYPOINT [ "npm", "run", "dev" ]