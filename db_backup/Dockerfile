FROM alpine:latest

RUN apk update
RUN apk add postgresql
RUN mkdir /run/postgresql
RUN chown postgres:postgres /run/postgresql/

WORKDIR /var/lib/postgresql

COPY --chown=postgres:postgres pgpass .pgpass
COPY --chown=postgres:postgres script.sh .

RUN chmod 600 .pgpass
RUN chmod +x script.sh

COPY cronjob /etc/crontabs/root

CMD [ "crond", "-f", "-d", "8" ]