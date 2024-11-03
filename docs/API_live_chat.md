## API Documentation for Live Chat Service

Summary:

The live chat service enables users to send real-time messages in specific chat rooms using WebSockets. This service manages WebSocket connections, broadcasts messages, and can retrieve chat history through HTTP endpoints. It is built with Django Channels and integrated with Redis for managing chat room states.

Note: All WebSocket and HTTP connections should use HTTPS for secure communication. In development, if using self-signed certificates, disable certificate verification when testing with wscat or similar tools.

## WebSocket Endpoints

1. Connect to a Chat Room

Description: Establishes a WebSocket connection for a user to a specified chat room.

```bash
wscat -c wss://localhost:10443/ws/chat/room_name/ --no-check
```

- Method: WebSocket
- Path Parameter: room_name (the name of the chat room)
- Response: Upon successful connection, the server will accept the WebSocket and allow for sending/receiving messages.

2. Send a Message

Description: Send a message to a specific chat room. The message is broadcast to all users connected to the room.

- Message Format(sent via WebSocket):

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

## HTTPS Endpoints
1. Send Message via API

Description: Sends a message to the chat service via HTTPS. This API is primarily used for testing purposes or non-WebSocket-based interactions.

```bash
wscat -c wss://localhost:10443/ws/chat/room_name/ --no-check
```

- Request Payload:

```bash
{
	"message": "Your message here"
}
```

- Response:

```plaintext
{
	"message": "Message sent!"
}
```

2. Retrieve Chat History

Description: Fetches the chat history for a specific chat room (currently returns an empty array as a placeholder).

```plaintext
GET https://localhost:10443/chat/history/               ?????Does it work
```

- Response:

```plaintext
{
	"chat_history": []
}
```

## Redis Integration

The live chat service relies on Redis to manage the state of active chat rooms and WebSocket channels. Ensure Redis is running and correctly configured in the environment variables.

## Summary for Frontend:

* WebSocket URL: Use wss://localhost:10443/ws/chat/{room_name}/ to securely connect to a chat room.
* Message Sending: Send messages as JSON over the WebSocket connection. For message reception, listen for events on the WebSocket stream.
* HTTP API: For fallback or testing, use the /chat/send/ endpoint to send messages via HTTPS.     ????? Check this

- Security Note: Always use HTTPS and securely manage any sensitive data transmitted over WebSocket or HTTPS connections.

Additional Notes:

* Self-Signed Certificate: In development environments, if using self-signed certificates, include the --no-check flag with wscat or set NODE_TLS_REJECT_UNAUTHORIZED=0 in your environment to avoid SSL verification errors.
