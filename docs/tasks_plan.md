Transcendence Project Plan - Next Steps, Tasks, and Roles
Introduction:
This document provides detailed next steps, task assignments, and key points for each module of the Transcendence project. Roles have been clearly assigned, and optional or potential tasks are marked as decisions to be made later. Key points highlight the core features and mandatory overlaps with the modules selected.
Key Tasks and Roles Breakdown:
1. Standard User Management (Backend) - Major - Key Points:
	- Implement user registration, login, profile management.
	- Store user data (profiles, friends, game history) in the database. - Integrate with 2FA for security.
	- Mandatory overlap: User authentication will feed into multiplayer for tracking users across tournaments and game history.
	- Assigned to: Ashley & Masum
	- Ashley: Set up Django models and database configuration for user profiles, authentication, and data storage.
	- Masum: Implement user authentication and manage the integration of 2FA.
	- Frontend (Felix): Build the UI for registration, login, profile management, and connect with backend API.
2. OAuth 42 (Backend) - Major - Key Points:
	- Implement OAuth via 42 API.
	- Mandatory overlap: OAuth login is an alternative but integrates with standard user profiles. - Assigned to: Ashley & Masum
	- Ashley: Handle OAuth integration with the backend (Django), ensuring security for login with 42 API.
	- Masum: Create additional routes for OAuth-related features (e.g., linking user profiles to OAuth accounts).
	- Frontend (Felix): UI for logging in with 42 credentials.
3. Remote Players (Gameplay & Backend) - Major - Key Points:
	- Multiplayer system where users can play remotely.
	- Mandatory overlap: Multiplayer capabilities will depend on server-side Pong implementation. - Assigned to: Ashley & Masum
	- Ashley: Set up WebSockets/Django Channels for real-time communication and synchronization.
	- Masum: Assist in maintaining the connection between clients and handle user interactions. - Frontend (Felix): UI for multiplayer mode.
4. Server-Side Pong (Backend) - Major - Key Points:
	- Game logic runs on the server, client keystrokes sent to the server.
	- Mandatory overlap: Core gameplay depends on this module for real-time multiplayer. - Assigned to: Ashley & Masum
	- Ashley: Implement the full server-side game logic (ball movement, player inputs, scoring).
	- Masum: Handle client keystrokes and assist with broadcasting updates to all players. - Frontend (Felix): Interface to reflect server game state updates.

5. Live Chat (Frontend & Backend) - Major - Key Points:
	- Real-time chat for players before, during, and after games.
	- Mandatory overlap: Enhances user experience in multiplayer mode. - Assigned to: Ashley & Masum
	- Ashley: Manage backend logic for storing chat messages and real-time delivery.
	- Masum: Set up communication channels for chat features. - Frontend (Felix): UI for live chat.
6. Two-Factor Authentication (2FA) - Major - Key Points:
	- Two-factor authentication for user accounts.
	- Mandatory overlap: Enhances user security for login. - Assigned to: Masum
	- Backend 2FA integration.
	- Frontend (Felix): UI for 2FA setup and login.
Suggested Tasks for the Upcoming Week (in order):
1. Ashley (Backend Focus - Complex Tasks):
	- First Task: Set up Django models and database (PostgreSQL) for Standard User Management. - Second Task: Begin the server-side Pong logic, including ball movement and scoring.
	- Third Task: Establish WebSockets for multiplayer communication.
2. Masum (Backend Focus - Support & Implementation):
	- First Task: Implement user authentication and integrate Two-Factor Authentication (2FA).

- Second Task: Collaborate with Ashley on handling client keystroke inputs for server-side Pong. - Third Task: Assist with setting up monitoring tools like Prometheus.
3. Felix (Frontend Focus):
	- First Task: Design the UI for user registration, login, and profile management.
	- Second Task: Create a basic multiplayer interface, making it responsive across devices. - Third Task: Begin designing the live chat UI, keeping it simple for integration.
Coordination Suggestions:
	- Ashley & Felix: Coordinate on connecting the frontend (UI) for user registration/login with the backend (Django) to ensure data is stored and retrieved correctly.
	- Ashley & Masum: Work together on setting up WebSockets for real-time player synchronization and chat.
	- Felix & Masum: Collaborate on ensuring live chat functionality integrates with the backend WebSocket infrastructure.
