DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yml
SERVICE=db

# default
up:
	$(DOCKER_COMPOSE) up -d

# normal build
build-up:
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) up -d

# build the service without using cache
new:
	$(DOCKER_COMPOSE) build --no-cache
	$(DOCKER_COMPOSE) up -d
	# @echo "Waiting for PostgreSQL health check to pass..."
	# $(DOCKER_COMPOSE) exec backend python manage.py makemigrations
	# $(DOCKER_COMPOSE) exec backend python manage.py migrate

# rebuild the service but not remove all
re: down up

re-new: fclean new

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

# make migration
makemigrate:
	$(DOCKER_COMPOSE) exec chat-service python manage.py makemigrations

# apply migration
migrate:
	$(DOCKER_COMPOSE) exec chat-service python manage.py migrate

# apply migration
exec-%:
	@if [ "$*" = "postgres_db" ]; then \
		echo "You are about to enter the postgres_db container."; \
		echo "To access PostgreSQL, run: psql -U \$$POSTGRES_USER -d \$$POSTGRES_DB"; \
	fi && \
	docker exec -it $* bash

# to run unit testing for all
test:
	$(DOCKER_COMPOSE) exec backend python manage.py test

# to run unit testing for specifc API
test-%:
	$(DOCKER_COMPOSE) exec backend python manage.py test "$*"

test-api.users:
	$(DOCKER_COMPOSE) exec backend python manage.py test api.users.tests.test_user_login
	$(DOCKER_COMPOSE) exec backend python manage.py test api.users.tests.test_user_registration

.PHONY: up build-nocache re fclean logs down clean-volumes clean-images clean-all superuser
