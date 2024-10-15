DOCKER_COMPOSE_FILE = docker/docker-compose.yml
DOCKER_BACKEND_SERVICE = web

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

# shortcuts for cDjabngo backend management
backend:
	docker-compose -f $(DOCKER_COMPOSE_FILE) exec $(DOCKER_BACKEND_SERVICE) bash

# run migrations in the backend container, research this??
migrate:
	docker-compose -f$(DOCKER_COMPOSE_FILE) exec $(DOCKER_BACKEND_SERVICE) python manage.py migrate

# make and apply migrations in the backend container, research this??
makemigrate:
	docker-compose -f$(DOCKER_COMPOSE_FILE) exec $(DOCKER_BACKEND_SERVICE) python manage.py makemigrations

# check status of the services
status:
	docker-compose -f $(DOCKER_COMPOSE_FILE) ps

# show logs
logs:
	docker-compose -f $(DOCKER_COMPOSE_FILE) logs -f $(DOCKER_BACKEND_SERVICE)