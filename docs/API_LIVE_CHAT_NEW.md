## WebSocket Endpoint

The WebSocket endpoint for connecting to the chat service is:
```perl
ws://<host>/ws/chat/<room_name>/
```

* <room_name>: Currently not used for backend logic but required in the URL.

## Connecting

To connect to the WebSocket:

1. Establish a WebSocket connection to the endpoint.
2. Include the Authorization header with the Bearer token for authentication.

Example using JavaScript:
```javascript
const socket = new WebSocket("ws://<host>/ws/chat/lobby/");
socket.onopen = () => console.log("WebSocket connected");
socket.onmessage = (event) => console.log("Received:", event.data);
socket.onclose = () => console.log("WebSocket closed");
```
Headers need to include the JWT token:
```javascript
socket.send(JSON.stringify({
  type: "authenticate",
  token: "Bearer <your_token_here>"
}));
```
## Sending Messages

Messages are sent as JSON objects. Below are the supported message types:

1. Whisper (Private Message)
    * Sends a private message to another user.
    * Payload:
```json
    {
        "type": "whisper",
        "target": "<target_username>",
        "content": "<message>"
    }
```
2. Group Message

    * Sends a message to all users in a specific group.
    * Payload:
```json
    {
        "type": "group",
        "group_name": "<group_name>",
        "content": "<message>"
    }
```
3. Lobby Message

    * Broadcasts a message to all users in the lobby.
    * Payload:
```json
    {
        "type": "lobby",
        "content": "<message>"
    }
```
4. Add Friend

    * Sends a friend request to another user.
    * Payload:
```json
    {
        "type": "add",
        "target": "<target_username>"
    }
```
5. Block User

    * Sends a notification to block another user.
    * Payload:
```json
        {
            "type": "block",
            "target": "<target_username>"
        }
```

## Receiving Messages

The server sends messages as JSON objects:
```json
{
    "message": "<message_content>"
}
```
Example:

    * For a whisper:
```json
{
    "message": "(Whisper from user1): Hello!"
}
```
    * For a lobby message:
```json
    {
        "message": "(Lobby): user1: Hello everyone!"
    }
```
## Disconnecting

When a user disconnects:

* The WebSocket connection closes automatically.
* The user is removed from the chat_lobby group.

## Error Handling

If something goes wrong (e.g., invalid message type or user not found), the server responds with an error message:
```json
{
    "error": "Error message here"
}
```
Example Workflow

1. Connect to the WebSocket:
```javascript
const socket = new WebSocket("ws://<host>/ws/chat/lobby/");
```
2. Send a Whisper:
```javascript
socket.send(JSON.stringify({
    type: "whisper",
    target: "user2",
    content: "Hi, user2!"
}));
```
3. Send a Lobby Message:
```javascript
socket.send(JSON.stringify({
    type: "lobby",
    content: "Hello everyone!"
}));
```
4. Add a Friend:
```javascript
socket.send(JSON.stringify({
    type: "add",
    target: "user3"
}));
```
5. Block a User:
```javascript
socket.send(JSON.stringify({
    type: "block",
    target: "user4"
}));
```