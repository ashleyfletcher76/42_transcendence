DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yml
SERVICE=db

# default
up:
	$(DOCKER_COMPOSE) up -d

# build the service without using cache
new:
	$(DOCKER_COMPOSE) build --no-cache
	$(DOCKER_COMPOSE) up -d

# rebuild the service but not remove all
re: down build up

re-new: fclean build up

# full clean of all the volumes etc
fclean:
	@read -p "Are you sure you want to clean everything? (y/n): " confirm && if [ "$$confirm" = "y" ]; then \
		$(DOCKER_COMPOSE) down -v --rmi all; \
		docker system prune -f --volumes; \
	else \
		echo "Aborted fclean."; \
	fi

# view logs of the running service
logs:
	$(DOCKER_COMPOSE) logs -f $(SERVICE)

logs-%:
	$(DOCKER_COMPOSE) logs -f $*

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

rebuild-%:
	$(DOCKER_COMPOSE) build --no-cache $*
	$(DOCKER_COMPOSE) up -d $*

# create a Django superuser
superuser:
	$(DOCKER_COMPOSE) exec backend python manage.py createsuperuser

.PHONY: up build-nocache re fclean logs down clean-volumes clean-images clean-all superuser
