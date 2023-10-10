#!/bin/bash

case $1 in
    "setup")
        ~/TrailBlaze/scripts/nginx/nginx.sh
    ;;
    "start")
        ~/TrailBlaze/scripts/start.sh
    ;;
    "restart")
        ~/TrailBlaze/scripts/restart.sh
    ;;
    *)
        echo "Usage: ./run.sh [setup | start | restart]"
        echo "setup   - sets up the nginx configuration"
        echo "start   - starts the project for the first time"
        echo "restart - removes the running dockers and starts again"
    ;;
esac