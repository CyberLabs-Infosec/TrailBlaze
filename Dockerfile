FROM ubuntu:20.04

RUN apt update

RUN apt install -y nginx
RUN /etc/init.d/nginx start

COPY nginx_app.conf /etc/nginx/sites-available

RUN ln -s /etc/nginx/sites-available/nginx_app.conf /etc/nginx/sites-enabled/

EXPOSE 4999

RUN /etc/init.d/nginx restart