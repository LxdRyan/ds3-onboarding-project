FROM postgres

ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydatabase

RUN command

EXPOSE 5432

COPY init.sql /docker-entrypoint-initdb.d/

VOLUME [ "/data" ]