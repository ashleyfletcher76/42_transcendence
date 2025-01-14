#!/bin/bash

echo "Stopping all running containers..."
docker stop $(docker ps -aq)

echo "Removing all containers..."
docker rm $(docker ps -aq)

echo "Removing all images..."
docker rmi $(docker images -q) -f

echo "Removing all volumes..."
docker volume rm $(docker volume ls -q)

echo "Removing all networks..."
docker network rm $(docker network ls -q)

echo "Pruning unused Docker resources..."
docker system prune -a --volumes -f

echo "Docker cleanup completed!"
