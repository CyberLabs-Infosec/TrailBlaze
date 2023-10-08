FROM alpine:latest

RUN apk update
RUN apk add postgresql
RUN mkdir /run/postgresql
RUN chown postgres:postgres /run/postgresql/

WORKDIR /var/lib/postgresql

COPY cronjob /etc/crontabs/root
RUN chown -R postgres .

# CMD [ "crond", "-f", "-d", "8" ]