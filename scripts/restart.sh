#!/bin/bash

containers=(trailblaze-file_server-1 trailblaze-frontend-1 trailblaze-admin-1 trailblaze-backend-1 trailblaze-docker_bot-1 trailblaze-fuel_cronjob-1
trailblaze-level_5-1 trailblaze-level_7-1 
trailblaze-level_8-1 
trailblaze-level_11-1 trailblaze-level_12-1 trailblaze-level_16-1 trailblaze-level_18-1 trailblaze-level_19-1 trailblaze-level_10-1 trailblaze-level_11-1 trailblaze-level_16-1 trailblaze-level_18-1 trailblaze-level_19-1)
images=(trailblaze-level_11 trailblaze-file_server trailblaze-docker_bot trailblaze-fuel_cronjob trailblaze-level_7 trailblaze-level_12 trailblaze-level_16 trailblaze-level_18 trailblaze-level_19 trailblaze-level_10 trailblaze-level_11 trailblaze-level_16 trailblaze-level_18 trailblaze-level_19)

echo "[*] removing old containers (except database)"
for i in "${containers[@]}"
do
    docker stop $i
    docker rm $i
done
echo "[+] containers removed successfully"

echo "[*] removing images"
for i in "${images[@]}"
do
    docker rmi $i
done
echo "[+] images removed successfully"

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

echo "[*] delete files in challenges/tmp"

cd ~/TrailBlaze/reset_flag
npm i
node main.js