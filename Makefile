DOCKER_COMPOSE_FILE = docker/docker-compose.yml
DOCKER_BACKEND_SERVICE = backend

#  build the project with cache
all: build

build:
	docker-compose -f $(DOCKER_COMPOSE_FILE) up --build

#  build the project without cache (forces a new build)
new:
	docker-compose -f $(DOCKER_COMPOSE_FILE) build --no-cache
	docker-compose -f $(DOCKER_COMPOSE_FILE) up

# stop all the running containers
down:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down

clean:
	docker system prune -f --volumes

# full clean of all the volumes etc
fclean:
	docker-compose -f $(DOCKER_COMPOSE_FILE) down -v --rmi all
	docker system prune -f --volumes
