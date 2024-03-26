FROM node:latest AS base

ARG ENV

ENV NODE_ENV=${ENV}
LABEL ENV=${ENV}


FROM base AS backend-base

LABEL APP=backend

WORKDIR /project/apps/backend

ENV DB_NAME=${ENV}
ENV DB_HOST=database
ENV DB_PORT=5432
ENV DB_USERNAME=webserver
ENV DB_PASSWD=123456

ENV DATABASE_URL=postgresql://${DB_USERNAME}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
ENV PORT=3001
EXPOSE ${PORT}
COPY .eslintrc.js ../../
COPY node_modules ./node_modules
COPY applications/backend package-lock.json .

RUN [ "sh", "-c", "npm ci" ]

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD [ "sh", "-c", "curl -f http://localhost:${PORT}/health || exit 1" ]


FROM backend-base AS migrate-development

CMD [ "npx", "prisma", "migrate", "dev" ]


FROM backend-base AS reset-development

CMD [ "npx", "prisma", "migrate", "reset", "--force" ]


FROM backend-base AS backend-production

RUN [ "sh", "-c", "npm run build" ]

ENTRYPOINT [ "npm", "run", "start:prod" ]


FROM backend-base AS backend-development

ENTRYPOINT [ "npm", "run", "dev" ]


FROM base as frontend-base

LABEL APP=frontend

WORKDIR /project/apps/frontend

ENV PORT=3000
EXPOSE ${PORT}

COPY .eslintrc.js ../../
COPY node_modules ./node_modules
COPY applications/frontend package-lock.json .

RUN ["sh", "-c", "npm ci"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD [ "sh", "-c", "curl -f http://localhost:${PORT} || exit 1" ]


FROM frontend-base AS frontend-development

ENTRYPOINT [ "npm", "run", "dev" ]