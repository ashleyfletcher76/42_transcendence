# Chat Service API Documentation

## Overview
The `chat-service` enables real-time messaging between users through WebSockets. It supports creating and joining chat rooms and facilitates seamless communication. The service is built using Django Channels, with Redis for real-time messaging and PostgreSQL for database management. This document outlines the current state of the service, available APIs, and frontend integration guidelines.

---

## Table of Contents
- [WebSocket Endpoints](#websocket-endpoints)
  - [Connect to a Chat Room](#connect-to-a-chat-room)
  - [Send and Receive Messages](#send-and-receive-messages)
- [HTTP Endpoints](#http-endpoints)
  - [Create Room API](#create-room-api)
  - [Join Room API](#join-room-api)
- [Using wscat for Testing](#using-wscat-for-testing)
- [Current State](#current-state)
- [Next Steps](#next-steps)

---

## WebSocket Endpoints

### Connect to a Chat Room
**WebSocket URL**: `wss://<your-domain>/ws/chat/{room_name}/`

To connect to a chat room, establish a WebSocket connection to the above URL, replacing `{room_name}` with the name of the room.

- **Example**:
```bash
  wscat -c wss://localhost:10443/ws/chat/my_room/ --no-check
```
* Behavior:
- On a successful connection, users can send and receive messages in real time.
- If the room does not exist or the user is unauthorized, the connection will fail.

### Send and Receive Messages

Once connected to a WebSocket room:

* To send a message:
```json
{
  "message": "Your message here"
}
```

* To receive messages:

- The server broadcasts messages sent by other users in the room:
```json
{
  "message": "Message from another user"
}
```

## HTTP Endpoints
### Create Room API
Endpoint

POST /chat/create-room/
Request Payload
```json
{
  "name": "Room Name",              // Required: Name of the room
  "type": "private",                // Optional: Room type ('private' or 'game'). Default is 'private'
  "invited_users": [2, 3, 4]        // Optional: List of user IDs to invite
}
```

Response

Status Code: 201 Created
```json
{
  "id": 1,
  "name": "Room Name",
  "type": "private",
  "creator": "creator_username",
  "invited_users": ["user1", "user2"]
}
```

Error Responses

1. Room Name Missing
```json
{
  "error": "Room name is required"
}
```

2. Room Name Already Exists
```json
{
  "error": "Room name already exists"
}
```

### Join Room API
Endpoint

POST /chat/join-room/
Request Payload
```json
{
  "room_id": 1                      // Required: ID of the room to join
}
```
Response
Status Code: 200 OK
```json
{
  "id": 1,
  "name": "Room Name",
  "type": "private",
  "members": ["user1", "user2"]
}
```

Error Responses

1. Room Not Found
```json
{
  "error": "Room not found"
}
```
2. Access Denied
```json
{
  "error": "You are not authorized to join this room"
}
```
## Using wscat for Testing
Connecting to a Chat Room

To connect to a chat room using wscat:
```bash
wscat -c wss://localhost:10443/ws/chat/{room_name}/ --no-check
```

Replace {room_name} with the desired room name.
Sending a Message

After establishing a WebSocket connection, send a message in JSON format:
```json
{
  "message": "Hello, World!"
}
```
Receiving Messages

Messages sent by other users in the room will automatically be broadcast to all connected clients.
## Current State
Implemented Features

1. Create Room:
- Users can create rooms with a name and optionally invite other users.
- The creator is automatically added to the room.

2. Join Room:
- Users can join a room they are invited to using the room ID.

3. WebSocket Connection:
- Users can connect to a room’s WebSocket channel to send and receive messages.

4. Room Model:
- Supports private and game room types.

## Next Steps
Backend

1. Message Persistence:
- Save messages sent in a room to the database.
- Implement an API to fetch message history for a room.

2. Room Listing:
- Provide an API to list rooms a user has created or is invited to.

3. Room Deletion:
- Allow creators to delete rooms.

4. User Invitations:
- Implement an API to invite users to existing rooms.

Frontend Integration

1. Create Room:
- Add a form to input the room name and select users to invite (optional).
- Send a POST request to /chat/create-room/ with the required data.

2. Join Room:
- Display a list of available rooms and allow users to join by providing a room ID.
- Send a POST request to /chat/join-room/.

3. WebSocket Integration:
- Open a WebSocket connection to a room after joining using the URL:
```bash
wss://<your-domain>/ws/chat/{room_name}/
```
- Implement message sending and listening for real-time updates.
