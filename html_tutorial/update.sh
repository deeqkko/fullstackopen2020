#!/bin/bash

echo "Building..."
docker build -t deeq/html-tutorial .
echo "Pushing to hub.docker.com..."
docker push deeq/html-tutorial
echo "Done!"