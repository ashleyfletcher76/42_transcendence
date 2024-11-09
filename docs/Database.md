## Service-Specific Databases Documentation
## Overview

In our ft_transcendence project, each microservice is backed by its own dedicated PostgreSQL database container. This setup follows the principles of modular architecture and provides several benefits, including enhanced data security, independent scalability, and streamlined maintenance.

Each service maintains its own data independently, minimizing cross-service dependencies and isolating data. For instance, the authentication data is securely stored in the auth-db, while user data, chat data, and game data each have their respective databases.

## Table of Contents
- [Benefits of Service-Specific Databases](#benefits-of-service-specific-databases)
- [Database Environment Variables](#database-environment-variables)
- [Accessing Service-Specific Databases Through the Makefile](#accessing-service-specific-databases-through-the-makefile)
  - [Authentication Database (auth-db)](#authentication-database-(auth-db))
  - [User Database (user-db)](#user-database-(user-db))
  - [Chat Database (chat-db)](#chat-database-(chat-db))
  - [Pong Game Database (pong-db)](#pong-game-database-(pong-db))
- [Makefile Configuration for Database Access](#makefile-configuration-for-database-access)
- [Security and Best Practices](#security-and-best-practices)
- [Summary](#summary)

## Benefits of Service-Specific Databases
1. Data Isolation

* Each service has its own database, which ensures that data remains separate and independent across services.
* Sensitive information, such as authentication tokens and user details, is stored exclusively within the respective service's database, reducing the risk of unauthorized access.

2. Scalability

* Service-specific databases allow each service to scale independently based on its data and usage demands.
* For example, the chat-db can be scaled independently of auth-db if the live chat needs more resources without impacting the authentication or user services.

3. Streamlined Maintenance

* Each database can be managed, backed up, or restored independently, making it easier to apply updates and run migrations on a per-service basis.
* This modular approach reduces the impact of maintenance tasks on the rest of the application, ensuring better uptime and resilience.

## Database Environment Variables

Each database connection is configured using environment variables in the .env file. Here’s a sample of the required variables:

```plaintext
# Authentication Database
AUTH_SERVICE_DB=myauthdb
AUTH_SERVICE_USER=myauthuser
AUTH_SERVICE_PASSWORD=myauthpassword
AUTH_DB_PORT=5432

# User Database
USER_SERVICE_DB=myuserdb
USER_SERVICE_USER=myuser
USER_SERVICE_PASSWORD=mypassword
USER_DB_PORT=5433

# Chat Database
CHAT_SERVICE_DB=mychatdb
CHAT_SERVICE_USER=mychatuser
CHAT_SERVICE_PASSWORD=mychatpassword
CHAT_DB_PORT=5434

# Pong Game Database
PONG_SERVICE_DB=mypongdb
PONG_SERVICE_USER=myponguser
PONG_SERVICE_PASSWORD=mypongpassword
PONG_DB_PORT=5435
```

These environment variables ensure that each service connects to its own dedicated database container.

## Accessing Service-Specific Databases Through the Makefile

To facilitate database management, the Makefile provides commands for accessing each service’s database. You can enter the PostgreSQL shell for each database container by using make exec-<service-db>. This command also displays the required credentials and database name for quick access.

Here’s how to access each database:
### Authentication Database (auth-db)

```bash
make exec-auth-db
```

Upon entering, use the following command to access PostgreSQL:

```bash
psql -U myauthuser -d myauthdb
```

### User Database (user-db)

```bash
make exec-user-db
```

Once inside, use the following command:

```bash
psql -U myuser -d myuserdb
```

### Chat Database (chat-db)

```bash
make exec-chat-db
```
Within the shell, connect using:

```bash
psql -U mychatuser -d mychatdb
```

### Pong Game Database (pong-db)

```bash
make exec-pong-db
```

Inside the shell, access the database with:

```bash
psql -U myponguser -d mypongdb
```

## Makefile Configuration for Database Access

The Makefile contains logic to display helpful instructions when accessing each database:

```makefile
# exec into container with custom instructions for database containers
exec-%:
	@if [ "$*" = "auth-db" ]; then \
		echo "You are about to enter the auth-db container."; \
		echo "To access PostgreSQL, run: psql -U $$AUTH_SERVICE_USER -d $$AUTH_SERVICE_DB"; \
	elif [ "$*" = "user-db" ]; then \
		echo "You are about to enter the user-db container."; \
		echo "To access PostgreSQL, run: psql -U $$USER_SERVICE_USER -d $$USER_SERVICE_DB"; \
	elif [ "$*" = "chat-db" ]; then \
		echo "You are about to enter the chat-db container."; \
		echo "To access PostgreSQL, run: psql -U $$CHAT_SERVICE_USER -d $$CHAT_SERVICE_DB"; \
	elif [ "$*" = "pong-db" ]; then \
		echo "You are about to enter the pong-db container."; \
		echo "To access PostgreSQL, run: psql -U $$PONG_SERVICE_USER -d $$PONG_SERVICE_DB"; \
	else \
		echo "You are about to enter the $* container."; \
	fi && \
	docker exec -it $* bash
```

This setup provides clear instructions for connecting to each database directly within the container.

## Security and Best Practices

Each database is configured to only accept internal connections, ensuring that sensitive data is not accessible from outside the application network. For production deployments, make sure to:

* Restrict access further by only exposing required ports internally.
* Use secure passwords for each database user.
* Enable SSL for database connections, if necessary.

## Summary
By using dedicated databases for each service, we maintain a modular, secure, and efficient architecture, aligning with best practices in microservices design and database management. This structure supports scalability and simplifies data management, ensuring the ft_transcendence project remains reliable and robust as it grows.
