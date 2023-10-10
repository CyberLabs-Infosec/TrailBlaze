#!/bin/bash

sudo cp ~/TrailBlaze/scripts/nginx/trailblaze.conf ~/TrailBlaze/scripts/nginx/admin_trailblaze.conf /etc/nginx/sites-available
sudo ln -s /etc/nginx/sites-available/trailblaze.conf /etc/nginx/sites-enabled
sudo ln -s /etc/nginx/sites-available/admin_trailblaze.conf /etc/nginx/sites-enabled
sudo systemctl restart nginx