FROM node:latest AS base

ARG ENV

ENV NODE_ENV=${ENV}
LABEL ENV=${ENV}

ENV DB_NAME=findit-${ENV}
ENV DB_HOST=database
ENV DB_PORT=5432
ENV DB_USERNAME=webserver
ENV DB_PASSWD=123456

ENV DATABASE_URL=postgresql://${DB_USERNAME}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

WORKDIR /project/apps/backend
ENV PORT=3000
COPY package*.json ./
COPY prisma ./prisma
RUN [ "sh", "-c", "npm install" ]
COPY . .
COPY ../../.eslintrc.js ../../
EXPOSE ${PORT}

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD [ "sh", "-c", "curl -f http://localhost:${PORT}/health || exit 1" ]


FROM base AS production

RUN [ "sh", "-c", "npm run build" ]

ENTRYPOINT [ "npm", "run", "start:prod" ]


FROM base AS development

CMD [ "npm", "run", "dev" ]


FROM base AS test