FROM python:3.7-buster

RUN apt-get update
RUN /usr/local/bin/python -m pip install --upgrade pip

WORKDIR /project
COPY ./requirements.txt /project
RUN pip install -r requirements.txt

EXPOSE 8003

ENTRYPOINT [ "gunicorn", "app:app", "-w", "2", "--threads", "2", "-b", "0.0.0.0:8003" ]
