#!/bin/bash

# Change docker environment to DEVELOPMENT MODE
echo "Switching to devmode..."

rm ../docker-compose.yml ../Dockerfile

cp DevFiles/docker-compose.yml ../
cp DevFiles/Dockerfile ../

echo "Devmode ready!"
