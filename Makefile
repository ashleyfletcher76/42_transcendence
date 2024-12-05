DOCKER_COMPOSE = docker-compose -f docker/docker-compose.yml

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

rebuild:
	@$(eval TARGETS=$(filter-out rebuild,$(MAKECMDGOALS)))
	@if [ -z "$(TARGETS)" ]; then \
		echo "Error: No containers specified. Usage: make rebuild <container1> <container2> ..."; \
		exit 1; \
	fi; \
	for container in $(TARGETS); do \
		if echo "$$container" | grep -q "db"; then \
			echo "Looking up volumes for $$container..."; \
			VOLUME_NAME=$$(docker volume ls --format "{{.Name}}" | grep "$$container" || echo ""); \
			if [ -n "$$VOLUME_NAME" ]; then \
				echo "Cleaning volume $$VOLUME_NAME for $$container..."; \
				docker volume rm -f $$VOLUME_NAME || echo "Failed to clean volume $$VOLUME_NAME."; \
			else \
				echo "No volume found for $$container."; \
			fi; \
		fi; \
		echo "Rebuilding $$container..."; \
		$(DOCKER_COMPOSE) build --no-cache $$container && $(DOCKER_COMPOSE) up -d $$container; \
	done

%:
	@true

# create a Django superuser
superuser:
	$(DOCKER_COMPOSE) exec chat-service python manage.py createsuperuser

# make migration
makemigrate-%:
	$(DOCKER_COMPOSE) exec $* python manage.py makemigrations

term-%:
	$(DOCKER_COMPOSE) exec $* zsh

# apply migration
migrate-%:
	$(DOCKER_COMPOSE) exec $* python manage.py migrate

# exec into container with custom instructions for database containers
exec-%:
	@if [ "$*" = "chat-db" ]; then \
		echo "You are about to enter the chat-db container."; \
		echo "To access PostgreSQL, run: psql -U mychatuser -d mychatdb"; \
		docker exec -it $* bash; \
	elif [ "$*" = "user-db" ]; then \
		echo "You are about to enter the user-db container."; \
		echo "To access PostgreSQL, run: psql -U myuser -d myuserdb"; \
		docker exec -it $* bash; \
	elif [ "$*" = "auth-db" ]; then \
		echo "You are about to enter the auth-db container."; \
		echo "To access PostgreSQL, run: psql -U myauthuser -d myauthdb"; \
		docker exec -it $* bash; \
	elif [ "$*" = "pong-db" ]; then \
		echo "You are about to enter the pong-db container."; \
		echo "To access PostgreSQL, run: psql -U myponguser -d mypongdb"; \
		docker exec -it $* bash; \
	else \
		echo "You are about to enter the $* container."; \
		docker exec -it $* bash; \
	fi

# to run unit testing for all
test:
	$(DOCKER_COMPOSE) exec user-service python manage.py test

.PHONY: up build-nocache re fclean logs down clean-volumes clean-images clean-all superuser rebuild
