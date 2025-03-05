FROM postgres

ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB

RUN command

EXPOSE 5432

COPY init.sql /docker-entrypoint-initdb.d/

VOLUME [ "/data" ]