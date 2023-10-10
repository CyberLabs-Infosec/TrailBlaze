#!/bin/bash

containers = ("trailblaze-file_server-1", "trailblaze-level_11-1", "trailblaze-frontend-1", "trailblaze-admin-1", "trailblaze-backend-1", "trailblaze-postgres-1")
images = ("trailblaze-level_11", "trailblaze-file_server")

for i in containers
do
    docker stop $i
    docker rm $i
done

for i in images
do
    docker rmi $i
done

rm -rf ~/TrailBlaze/*/.next
rm -rf ~/TrailBlaze/*/node_modules

cd ~/TrailBlaze/client
npm i sharp
npm i
npm run build

cd ~/TrailBlaze/admin
npm i
npm run build

cd ~/TrailBlaze/api
npm i
cd ~/TrailBlaze/

docker compose up -d