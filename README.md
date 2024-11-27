# 42_Transcendence

## Table of Contents
- [Project Overview](#project-overview)
- [What We Are Trying to Solve](#what-we-are-trying-to-solve)
- [Modules to Be Implemented](#modules-to-be-implemented)
- [Potential Modules (Future Consideration)](#potential-modules-future-consideration)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running the Project](#running-the-project)
  - [Stopping the Project](#stopping-the-project)
  - [List of Commands](#list-of-commands)
  - [Simulating Live Chat](#simulating-live-chat)
  - [Makefile: Working with exec Commands](#makefile-working-with-exec-commands)
  - [Internal HTTP Communication and NGINX Security Layer](#internal-http-communication-and-nginx-security-layer)
- [Project Progress Updates/To Do's](#project-progress-updates-to-dos)
  - [Recent Changes List](#recent-changes-list)
  - [To Note List](#to-note-list)
  - [To Do List](#to-do-list)
- [Example Curl Commands](#example-curl-commands)
- [Authors](#authors)

---

## Project Overview

**ft_transcendence** is a full-stack web application project that aims to build an interactive multiplayer game experience, along with real-time features such as live chat. The core of the project is to develop a **server-side Pong game** that allows players to compete remotely, with additional functionalities such as user authentication (including OAuth and Two-Factor Authentication), gameplay tracking, and potential AI opponents.

The project leverages modern web development practices and frameworks like **Django** for the backend, while the frontend will be handled separately using modern JavaScript frameworks (like React, to be managed by a frontend developer).

---

## What We Are Trying to Solve

The goal of **ft_transcendence** is to create a scalable and secure multiplayer game platform where users can:
- Compete in a **server-side Pong game**.
- Authenticate using both **standard** and **OAuth** mechanisms.
- Communicate via **live chat**.
- Track their gameplay stats and history.

Additionally, we plan to explore features like **AI opponents** and **game customization** to enhance the user experience. This project will also focus on security features like **Two-Factor Authentication** to ensure a safe gaming environment.

---

## Modules to Be Implemented

We are initially focusing on the following **major modules** to ensure the core functionality is in place:

1. **Standard User Management (Major)**
   - User registration, login, and profile management.
   - Integration with Two-Factor Authentication (2FA) for added security.

2. **OAuth 42 (Major)**
   - OAuth integration using the 42 API for seamless authentication.

3. **Remote Players (Major)**
   - Multiplayer system where users can play Pong remotely.

4. **Server-Side Pong Game (Major)**
   - Core gameplay logic for Pong, including ball movement, player inputs, and scoring, all handled server-side.

5. **Live Chat (Major)**
   - Real-time chat system that allows players to communicate before, during, and after games.

6. **Backend Microservices (Major)**
   - Breaking down the backend into microservices for better scalability and maintainability.

7. **Monitoring (Minor)**
   - Monitoring the health and performance of the system using tools like Prometheus.

8. **Support for All Devices (Minor)**
   - Ensure the game is responsive and works across different devices (mobile, desktop, tablet).

---

## Potential Modules (Future Consideration)

We may implement these **optional modules** based on project scope, time, and user feedback:

1. **AI Opponent (Potential)**
   - Introducing an AI opponent for users who want to play against the computer instead of human players.

2. **Game Customization (Potential)**
   - Allowing users to customize the game experience (different maps, game settings, etc.).

3. **Game and Stat Tracking (Potential)**
   - Tracking user stats such as wins/losses and displaying them in a personal dashboard.

4. **Expanding to Multi-Browser Support (Potential)**
   - Ensuring compatibility across all major web browsers (e.g., Chrome, Firefox).

5. **Multi-Language Support (Potential)**
   - Adding support for multiple languages to make the platform accessible to a wider audience.

---

## Getting Started

### Prerequisites
- **Docker** and **Docker Compose** must be installed.
- A `.env` file with your database credentials and secret keys should be placed in the docker directory.

Each service (auth, user, chat, pong) has its own dedicated PostgreSQL database container. Ensure the .env file contains separate database credentials for each service as shown below:
```plaintext
# Database configurations
AUTH_SERVICE_DB=myauthdb
AUTH_SERVICE_USER=myauthuser
AUTH_SERVICE_PASSWORD=myauthpassword

USER_SERVICE_DB=myuserdb
USER_SERVICE_USER=myuser
USER_SERVICE_PASSWORD=mypassword


CHAT_SERVICE_DB=mychatdb
CHAT_SERVICE_USER=mychatuser
CHAT_SERVICE_PASSWORD=mychatpassword

PONG_SERVICE_DB=mypongdb
PONG_SERVICE_USER=myponguser
PONG_SERVICE_PASSWORD=mypongpassword

LOBBY_SERVICE_DB=mylobbydb
LOBBY_SERVICE_USER=mylobbyuser
LOBBY_SERVICE_PASSWORD=mylobbypassword

# Django superuser
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=hello

DJANGO_DEBUG=True
DJANGO_SECRET_KEY=mysecret
```

**Note**: All services use HTTPS for secure communication. If using self-signed certificates, use `-k` in `curl` commands or `--no-check` in `wscat` to bypass certificate verification.

### Running the Project

1. Clone the repository:
```bash
git clone https://github.com/ashleyfletcher76/42_transcendence.git
cd 42_transcendence
```

2. To set up and run the containers:
```bash
make new
```

or

```bash
make up
```

To deactivate the server, run this command:
```bash
deactivate
```

3. Access the application at:
```bash
https://0.0.0.0:443
```

### Stopping the Project
```bash
make down
```

### List of Commands

* Creates and runs the Docker containers:
```bash
make new
```

* Starts the Docker containers without rebuilding them:
```bash
make up
```

* Cleans up all Docker containers and volumes:
```bash
make fclean
```

* Shows us some of the logs:
```bash
make logs
```
* We can also show logs for specific container, just write "make logs-" followed by the container name:
```bash
make logs-
```

* Similary to previous make logs that can be specific to containers, we can also do the same with rebuilding a container, just write the container name following the "-"
```bash
make rebuild-
```

* Similary to previous make logs and rebuild, that can be specific to containers, we can also do the same with entering a container, just write the container name following the "-"
```bash
make exec-postgres_db
```

### Simluating Live Chat

## Requirements

To simulate the chat using WebSockets in the terminal, you’ll need to use wscat, a WebSocket client for the terminal. Follow the steps below to install and use it.

### Install wscat

- To install `wscat`, you need Node.js and npm installed. You can install `wscat` globally using npm:

```bash
npm install -g wscat
```

## Simulating in the terminal
After installing wscat, you can connect to the WebSocket server running on your backend using the following command:

1. Open a terminal and run:
```bash
wscat -c wss://localhost:10443/ws/chat/room_name/ --no-check
```

2. Once connected, you can start typing messages directly into the terminal. Every message you type will be sent to the chat room.

## Sending a message
When connected via wscat, you can send a message in JSON format like this:

```plaintext
{"message": "Hello everyone!"}
```

## Receiving a message
Whenever a message is sent by another user, it will appear in your terminal as a JSON object. For example:
```plaintext
{"message": "Hello everyone!", "username": "JohnDoe"}
```

## Disconnecting

```plaintext
CTRL+C
```

### Makefile: Working with exec Commands

The Makefile includes commands for interacting with each specific service container. Notably, the make exec-<container_name> command allows you to enter each container and provides custom instructions for database access when entering database containers.

For example, to enter the chat-db container:

```bash
make exec-chat-db
```

Upon execution, you will see a message providing guidance on accessing PostgreSQL for that specific service:

```plaintext
You are about to enter the chat-db container.
To access PostgreSQL, run: psql -U mychatuser -d mychatdb
```

This structure applies to all database containers (auth-db, user-db, chat-db, pong-db), making it easy to work directly with the databases associated with each microservice.

For other containers, make exec-<container_name> simply opens a shell without any database access instructions.

### Internal HTTP Communication and NGINX Security Layer
* Internal Service Communication

In 42_Transcendence, backend services (auth, user, chat, pong) communicate internally over HTTP to streamline and simplify service-to-service communication. Each service operates within an isolated containerized environment, allowing HTTP connections to remain secure within the Docker network without exposure to external threats.

* NGINX Security Layer for Frontend Requests

To protect the backend from unauthorized access and external threats, all external communication to backend services is directed through an NGINX reverse proxy. This NGINX proxy:

1. Enforces HTTPS for any incoming requests from the frontend, ensuring that data transmitted to and from users is securely encrypted.
2. Filters requests: Only legitimate frontend requests with proper JWT tokens are routed to the backend services. NGINX manages HTTP-to-HTTPS redirection, ensuring that only HTTPS requests reach the backend from external sources.

Thus, even though the backend services use HTTP for internal communication, external requests are filtered and secured by NGINX, making the entire architecture secure for users.

## Project Progress Updates/To Do's

### Recent Changes List
- The database uses the Django default table but only taking username and password

- Login feature usable

- Now we have a JWT token for the frontend, token lasts 5 mins and the refresh token lasts 1 day. The frontend can use this and store it tell if the user was logged in already. If 401 is returned they either dont exist or token has timed out

- .env file updated with DJANGO superuser values.

- Live chat now working and I created uvicorn to be our server for live chat container.

- Each Django service now operates with a dedicated PostgreSQL database container, each with its unique set of environment variables. This separation supports the microservice architecture and simplifies database management across services.
- Updated .env file structure to include separate environment variables for each database.
- Health checks added for each backend service and now integrated with NGINX, which is configured to run all traffic securely over HTTPS.
- Database initialization scripts for each service ensure proper setup and security for individual databases at startup.
- New Makefile commands to facilitate managing individual containers, including make exec-<container_name> for specific database access instructions.
- JWT Token for Authentication: Tokens are issued for frontend authentication, with a 5-minute expiry for the access token and a 1-day expiry for the refresh token.
- nternal Service Communication Over HTTP: Services communicate via HTTP within the Docker network, while NGINX handles HTTPS for external requests.

### To Note List
- Regarding the web chat, frontend should check if a user is interacting with web chat, if so tehy request a refresh on their JWT token to keep the player logged in regardless of their web chat usage time

### To Do List
- Update the unit testing so that it can run any test inside the tests directory for each app

## Example Curl Commands

These commands should be done in the terminal, this is just to test the backend without the frontend being ready.

Create a user:
```plaintext
curl -X POST http://localhost:8001/users/register/ \
     -H "Content-Type: application/json" \
     -d '{"username": "newuser", "password": "mypassword"}'
```

Login with user:
```plaintext
curl -X POST http://localhost:8000/auth/login/ \
     -H "Content-Type: application/json" \
     -d '{"username": "newuser", "password": "mypassword"}'
```

Update User profile:
```plaintext
curl -X PUT http://localhost:8001/users/profile/ \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <access_token>" \
     -d '{"display_name": "New User", "bio": "This is my bio", "avatar": null}'
```

Logout user:
```plaintext
curl -k -X POST http://localhost:8000/auth/logout/ \
```

Validate token:
```bash
curl -X POST http://localhost:8000/auth/validate-token/ \
     -H "Authorization: Bearer <access_token>" \
     -H "Content-Type: application/json" \
     -d '{}'
```

Refresh token:
```bash
curl -X POST http://localhost:8000/auth/token/refresh/ \
     -H "Content-Type: application/json" \
     -d '{"refresh": "<refresh_token>"}'
```

Create room:
```bash
curl -X POST http://localhost:8003/chat/create-room/ \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer your_access_token" \
     -d '{
           "name": "test_room",
           "type": "private",
           "invited_users": []
         }'
```

## Authors

- **Ashley Fletcher** - *Developer* - [GitHub Profile](https://github.com/ashleyfletcher76)
- **Muhammet Köse** - *Developer* - [GitHub Profile](https://github.com/masummmm54)
- **Felix Federolf** - *Developer* - [GitHub Profile](https://github.com/ffederol)
