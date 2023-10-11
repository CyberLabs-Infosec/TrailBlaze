#!/bin/bash

sudo cp ~/TrailBlaze/scripts/nginx/trailblaze.conf ~/TrailBlaze/scripts/nginx/admin.conf ~/TrailBlaze/scripts/nginx/inspect.conf ~/TrailBlaze/scripts/nginx/checkforsum.conf ~/TrailBlaze/scripts/nginx/revjs.conf ~/TrailBlaze/scripts/nginx/maxxor.conf ~/TrailBlaze/scripts/nginx/overflow.conf ~/TrailBlaze/scripts/nginx/readme.conf ~/TrailBlaze/scripts/nginx/cookie.conf ~/TrailBlaze/scripts/nginx/jwt.conf ~/TrailBlaze/scripts/nginx/bluff.conf /etc/nginx/sites-available
echo "[+] copied config files successfully to /etc/nginx/sites-available"

sudo ln -s /etc/nginx/sites-available/trailblaze.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/admin.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/inspect.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/checkforsum.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/revjs.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/maxxor.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/overflow.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/readme.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/cookie.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/jwt.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/bluff.conf /etc/nginx/sites-enabled
echo "[+] softlinks created successfully"

echo "[*] restarting nginx"
sudo systemctl restart nginx
echo "[+] nginx restart successful"