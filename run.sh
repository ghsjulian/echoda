#!/bin/bash

# Clear the screen
clear

# First pull the remote repo and fetch
cd /var/www/echoda
git pull && git fetch

# Go to admin directory and remove old build files then build again
cd /var/www/echoda/admin
rm -rf dist && npm run build

# Go to client directory and remove old build files then build again
cd /var/www/echoda/client
rm -rf dist && npm run build

# Go to server directory and refesh the directory and restart the server
cd /var/www/echoda/server
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx
pm2 restart server
pm2 save
pm2 logs server
