cp ./trailblaze.conf ./admin_trailblaze.conf /etc/nginx/sites-available
ln -s /etc/nginx/sites-available/trailblaze.conf /etc/nginx/sites-enabled
ln -s /etc/nginx/sites-available/admin_trailblaze.conf /etc/nginx/sites-enabled
systemctl restart nginx