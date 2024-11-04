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

Example `.env` file:
```plaintext
DJANGO_SECRET_KEY=mysecret
POSTGRES_DB=mydb
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
DJANGO_DEBUG=True

# Django superuser
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@example.com
DJANGO_SUPERUSER_PASSWORD=hello
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

## Project Progress Updates/To Do's

### Recent Changes List
- The database uses the Django default table but only taking username and password

- Login feature usable

- Now we have a JWT token for the frontend, token lasts 5 mins and the refresh token lasts 1 day. The frontend can use this and store it tell if the user was logged in already. If 401 is returned they either dont exist or token has timed out

- .env file updated with DJANGO superuser values.

- Live chat now working and I created uvicorn to be our server for live chat container.

- Superuser is now created at compialtion time, admin page can be accessesed at this URL: ??? Not yet
```plaintext
https://localhost:443/admin/
```

- I just changed all the working containers to HTTPS and now running securely

- Health check added inside the apps for each backend service and now nginx is also added into the main docker-compose file. With a self-signed certificate be automatically created

### To Note List
- Regarding the web chat, frontend should check if a user is interacting with web chat, if so tehy request a refresh on their JWT token to keep the player logged in regardless of their web chat usage time

### To Do List
- Update the unit testing so that it can run any test inside the tests directory for each app

## Example Curl Commands

These commands should be done in the terminal, this is just to test the backend without the frontend being ready.

Create a user:
```plaintext
curl -k -X POST https://localhost:9443/users/register/ \
    -H "Content-Type: application/json" \
    -d '{"username": "newuser", "password": "password123"}'
```

Login with user:
```plaintext
curl -k -X POST https://localhost:8443/auth/login/ \
    -H "Content-Type: application/json" \
    -d '{"username": "newuser", "password": "password123"}'
```

Logout user:
```plaintext
curl -k -X POST https://localhost:8443/auth/logout/ \
    -H "Content-Type: application/json" \
    -d '{"refresh_token": "your_refresh_token_here"}'
```

## Authors

- **Ashley Fletcher** - *Developer* - [GitHub Profile](https://github.com/ashleyfletcher76)
- **Muhammet Köse** - *Developer* - [GitHub Profile](https://github.com/masummmm54)
- **Felix Federolf** - *Developer* - [GitHub Profile](https://github.com/ffederol)
