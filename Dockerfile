FROM postgres:9.6
ENV POSTGRES_DB kanbahn_test
ENV POSTGRES_PASSWORD passwd
ENV POSTGRES_USER kanbahner
COPY ddl_full.sql /docker-entrypoint-initdb.d/