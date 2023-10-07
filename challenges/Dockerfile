FROM python:3.8

RUN apt-get update
RUN /usr/local/bin/python -m pip install --upgrade pip

WORKDIR /project
COPY ./requirements.txt /project
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8003
WORKDIR /project

ENTRYPOINT [ "gunicorn", "app:app", "-w", "2", "--threads", "2", "-b", "0.0.0.0:8003" ]
