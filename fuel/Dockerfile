FROM alpine:latest

RUN apk add --no-cache python3 py3-pip

WORKDIR /home

COPY ./requirements.txt .
COPY ./main.py .
COPY ./fuel_cronjob /etc/crontabs/root

RUN pip install -r requirements.txt

# CMD [ "crond", "-f", "-d", "8" ]