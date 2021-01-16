#!/bin/bash

# Change docker environment to PRODUCTION MODE
echo "Changing to production mode..."

rm ../docker-compose.yml ../Dockerfile

cp ProdFiles/docker-compose.yml ../
cp ProdFiles/Dockerfile ../

echo "Production mode ready!"
