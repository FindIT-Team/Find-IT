FROM node:alpine AS base

ARG ENV

ENV NODE_ENV=${ENV}
LABEL ENV=${ENV}

RUN apk --no-cache add curl


FROM base AS backend-base

LABEL APP=backend

WORKDIR /project/apps/backend

HEALTHCHECK --interval=5s --timeout=10s --start-period=5s --retries=3 CMD [ "sh", "-c", "curl -f http://localhost:${PORT}/health || exit 1" ]

ENV DB_NAME=${ENV}
ENV DB_HOST=database
ENV DB_PORT=5432
ENV DB_USERNAME=webserver
ENV DB_PASSWD=123456

ENV DATABASE_URL=postgresql://${DB_USERNAME}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
ENV PORT=80
EXPOSE ${PORT}
COPY .eslintrc.js ../../
COPY applications/backend/package.json package-lock.json .

RUN npm config set registry https://registry.npmjs.org/

RUN mkdir node_modules
RUN [ "sh", "-c", "npm ci", "--no-audit" ]

COPY node_modules/.prisma/client ./node_modules/.prisma/client
COPY applications/backend/prisma ./prisma
COPY applications/backend .


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

HEALTHCHECK --interval=5s --timeout=10s --start-period=5s --retries=3 CMD [ "sh", "-c", "curl -f http://localhost:${PORT} || exit 1" ]

ENV PORT=80
EXPOSE ${PORT}

COPY .eslintrc.js ../../
COPY applications/frontend/package.json package-lock.json .

RUN npm config set registry https://registry.npmjs.org/

RUN mkdir node_modules
RUN [ "sh", "-c", "npm ci", "--no-audit" ]

COPY applications/frontend .

FROM frontend-base AS frontend-development

ENTRYPOINT [ "npm", "run", "dev" ]