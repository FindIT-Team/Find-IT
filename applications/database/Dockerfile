FROM postgres:latest as BASE

ENV POSTGRES_USER=webserver
ENV POSTGRES_PASSWORD=123456
ENV PGDATA=/var/lib/postgresql/data/pg-data

FROM base as dev

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD pg_isready -U webserver -d findit-dev || exit 1

ENV POSTGRES_DB=findit-dev
VOLUME /var/lib/postgresql/data/pg-data

FROM base as prod

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD pg_isready -U webserver -d findit-prod || exit 1

ENV POSTGRES_DB=findit-prod
VOLUME /var/lib/postgresql/data/pg-data

FROM base as test

HEALTHCHECK --interval=2s --timeout=10s --start-period=2s --retries=3 CMD pg_isready -U webserver -d findit-test || exit 1

ENV POSTGRES_DB=findit-test