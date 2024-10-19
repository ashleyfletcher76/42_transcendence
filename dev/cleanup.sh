#!/bin/bash

# Stop all running containers
echo "Stopping all running containers..."
docker stop $(docker ps -qa)

# Remove all containers
echo "Removing all containers..."
docker rm $(docker ps -a -q)

# Remove all images
echo "Removing all images..."
docker rmi $(docker images -qa)

# Remove all volumes
echo "Removing all volumes..."
docker volume rm $(docker volume ls -q)

# Remove all networks (except the default bridge, host, and none networks)
echo "Removing all networks..."
docker network rm $(docker network ls -q) 2>/dev/null

echo "Docker cleanup complete."
