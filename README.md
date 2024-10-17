## 42_Transendence

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
- [Update List](#update-list)
- [To Note List](#to-note-list)
- [Example Curl Commands](#example-curl-commands)
- [Authors](#authors)

---

## Project Overview

**ft_transcendence** is a full-stack web application project that aims to build an interactive multiplayer game experience, along with real-time features such as live chat. The core of the project is to develop a **server-side Pong game** that allows players to compete remotely, with additional functionalities such as user authentication (including OAuth and Two-Factor Authentication), gameplay tracking, and potential AI opponents.

The project leverages modern web development practices and frameworks like **Django** for the backend, while the frontend will be handled separately using modern JavaScript frameworks (like React, to be managed by a frontend developer).

## What We Are Trying to Solve

The goal of **ft_transcendence** is to create a scalable and secure multiplayer game platform where users can:
- Compete in a **server-side Pong game**.
- Authenticate using both **standard** and **OAuth** mechanisms.
- Communicate via **live chat**.
- Track their gameplay stats and history.

Additionally, we plan to explore features like **AI opponents** and **game customization** to enhance the user experience. This project will also focus on security features like **Two-Factor Authentication** to ensure a safe gaming environment.

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

Example .env file:
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

- Run this command to create a superuser-----no longer needed, will be done at compilation:
```bash
make superuser
```

The project has lots of Makefile functionality, if I have missed something, read the Makefile and figure it out. A new feature is for ---- "make exec-%", i.e. the % being the name of your container and then you can easily enter it.

### Running the Project

1. Clone the repository:
```bash
git clone https://github.com/ashleyfletcher76/42_transcendence.git
cd 42_transcendence
```

To now(15.10.24) open the virtual environment and run the server, type these commands:
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

2. Access the application at:
```bash
http://0.0.0.0:8000
```

followed by the page you want to locate, one example would be:
```bash
http://0.0.0.0:8000/api/users/profile/
```

I will give out more information as I go.

### Stopping the Project
```bash
make down
```

### List of Commands

```bash
make new
```

```bash
make up
```

```bash
make fclean
```

```bash
make logs-backend
```

```bash
make logs-backend
```

```bash
make rebuild-backend
```

```bash
make rebuild-postgres_db
```

```bash
make exec-postgres_db
```

## Update List
- The database uses the Django default table but only taking username and password

- Login feature usable

- Now we have a JWT token for the frontend, token lasts 5 mins and the refresh token lasts 1 day. The frontend can use this and store it tell if the user was logged in already. If 401 is returned they either dont exist or token has timed out

- .env file updated with DJANGO superuser values.

- Superuser is now created at compialtion time, admin page can be accessesed at this URL:
```plaintext
http://localhost:8000/admin/
```

## To Note List
- Regarding the web chat, frontend should check if a user is interacting with web chat, if so tehy request a refresh on their JWT token to keep the player logged in regardless of their web chat usage time

## Example Curl Commands

These commands should be done in the terminal, this is just to test the backend without the frontend being ready.

Create a user:
```plaintext
curl -X POST http://localhost:8000/api/users/register/ \
-H "Content-Type: application/json" \
-d '{
  "username": "newuser",
  "password": "newpassword123"
}'
```

Login with user:
```plaintext
curl -X POST http://localhost:8000/api/users/login/ \
-H "Content-Type: application/json" \
-d '{
  "username": "newuser",
  "password": "newpassword123"
}'
```

Logout user:
```plaintext
curl -X POST http://localhost:8000/api/users/logout/
```

## Authors

- **Ashley Fletcher** - *Developer* - [GitHub Profile](https://github.com/ashleyfletcher76)
- **Muhammet Köse** - *Developer* - [GitHub Profile](https://github.com/masummmm54)
- **Felix Federolf** - *Developer* - [GitHub Profile](https://github.com/ffederol)
