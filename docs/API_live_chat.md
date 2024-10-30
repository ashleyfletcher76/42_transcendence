## API Documentation for Live Chat Service

Summary:

The live chat service allows users to send real-time messages in specific chat rooms using WebSockets. This service manages WebSocket connections for a room, broadcasts messages, and can retrieve chat history through HTTP endpoints. This service is built with Django Channels and integrated with Redis for managing the chat room state.

## WebSocket Endpoints

1. Connect to a Chat Room

Description: Establishes a WebSocket connection for a user to a specified chat room.

```bash
wscat -c ws://localhost:8003/ws/chat/testroom/
```

- Method: WebSocket
- Path Parameter: room_name (the name of the chat room)
- Response: Upon successful connection, the server will accept the WebSocket and allow for sending/receiving messages.

2. Send a Message

Description: Send a message to a specific chat room. The message is broadcast to all users connected to the room.

- Message Format:

```bash
{
	"message": "Your message here"
}
```

- WebSocket Path: Use the WebSocket connection established via /ws/chat/{room_name}/ endpoint.
- Response: The server broadcasts the message to all participants in the room.

3. Receive Messages

Description: Clients receive real-time messages sent by others in the chat room.

- Response: Whenever a message is sent to the chat room, all connected users will receive:

```bash
{
	"message": "Message from another user"
}
```

## HTTP Endpoints
1. Send Message via API

Description: Sends a message to the chat service via HTTP. This API is primarily used for testing purposes or non-WebSocket-based interactions.

```plaintext
POST /chat/send/
```

- Request Payload:

```bash
{
	"message": "Your message here"
}
```

- Response:

```bash
{
	"message": "Message sent!"
}
```

2. Retrieve Chat History

Description: Fetches the chat history for a specific chat room (currently returns an empty array as a placeholder).

```plaintext
GET /chat/history/
```

- Response:

```bash
{
	"chat_history": []
}
```

## Redis Integration

The live chat service relies on Redis to manage the state of active chat rooms and WebSocket channels. Ensure Redis is running and correctly configured in the environment variables.

## Summary for Frontend:

- WebSocket URL: Connect to the WebSocket endpoint ws://localhost:8003/ws/chat/{room_name}/ to join a chat room.
- Message Sending: Messages should be sent as JSON in the WebSocket connection. On receiving messages, the frontend should listen for message events in the WebSocket stream.
- HTTP API: For sending messages via HTTP (if needed for fallback scenarios), use the /chat/send/ endpoint.
