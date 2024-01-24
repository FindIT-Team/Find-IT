FROM node:latest AS base

ARG ENV

ENV NODE_ENV=${ENV}
LABEL ENV=${ENV}

ENV API_ENDPOINT=http://backend:3000/api

WORKDIR /app
ENV PORT=3000
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE ${PORT}

RUN npx next telemetry disable

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD curl -f http://localhost:$PORT || exit 1

RUN mv .env.development .env


FROM base AS production

RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]


FROM base AS development

ENTRYPOINT [ "npm", "run", "dev" ]