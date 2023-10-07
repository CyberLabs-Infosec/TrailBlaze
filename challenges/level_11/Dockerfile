FROM python:3.7-buster

RUN apt-get update
RUN /usr/local/bin/python -m pip install --upgrade pip

WORKDIR /project
COPY build/ /project
RUN pip install -r requirements.txt

EXPOSE 8003
WORKDIR /project

ENTRYPOINT [ "./start_gunicorn_server.sh" ]
