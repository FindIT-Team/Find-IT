FROM node:latest AS base

ARG ENV

ENV NODE_ENV=${ENV}
LABEL ENV=${ENV}

ENV DB_NAME=findit-${ENV}
ENV DB_HOST=database
ENV DB_PORT=5432
ENV DB_USERNAME=webserver
ENV DB_PASSWD=123456

WORKDIR /app
ENV PORT=3000
COPY package*.json ./
RUN [ "sh", "-c", "npm i" ]
COPY . .
EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD [ "sh", "-c", "curl -f http://localhost:${PORT}/api/health || exit 1" ]


FROM base AS production

RUN [ "sh", "-c", "mv .env.${NODE_ENV} .env" ]
RUN [ "sh", "-c", "rm .env.*" ]
RUN [ "sh", "-c", "npm run build" ]

ENTRYPOINT [ "npm", "run", "start:prod" ]


FROM base AS development

RUN [ "sh", "-c", "mv .env.${NODE_ENV} .env" ]
RUN [ "sh", "-c", "rm .env.*" ]

ENTRYPOINT [ "npm", "run", "dev" ]


FROM base AS test

RUN [ "sh", "-c", "rm .env.*" ]

CMD [ "sh", "-c", "npm run test" ]