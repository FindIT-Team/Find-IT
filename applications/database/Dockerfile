FROM postgres:latest as base

ARG ENV

LABEL ENV=${ENV}
ENV POSTGRES_DB=findit-${ENV}
ENV POSTGRES_USER=webserver
ENV POSTGRES_PASSWORD=123456
ENV PGDATA=/var/lib/postgresql/data/pg-data
EXPOSE 5432

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 CMD pg_isready -U webserver -d $POSTGRES_DB || exit 1