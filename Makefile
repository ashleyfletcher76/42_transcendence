DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yml
SERVICE=db

# default
up:
	$(DOCKER_COMPOSE) up -d

# build the service without using cache
new:
	$(DOCKER_COMPOSE) build --no-cache
	$(DOCKER_COMPOSE) up -d

# rebuild the service
re: fclean build up

# full clean of all the volumes etc
fclean:
	$(DOCKER_COMPOSE) down -v --rmi all
	docker system prune -f --volumes

# view logs of the running service
logs:
	$(DOCKER_COMPOSE) logs -f $(SERVICE)

# stop the running services but leave volumes intact
down:
	$(DOCKER_COMPOSE) down

# remove only the volumes
clean-volumes:
	@docker volume prune -f

# remove dangling images
clean-images:
	@docker image prune -f

# remove dangling images, volumes, containers, networks
clean-all:
	@docker system prune --volumes -f

.PHONY: up build-nocache re fclean logs down clean-volumes clean-images clean-all
