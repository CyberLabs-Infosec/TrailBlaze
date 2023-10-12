#!/bin/bash

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

cd ~/TrailBlaze/reset_flag
npm i
cd ~/TrailBlaze/

docker compose up -d