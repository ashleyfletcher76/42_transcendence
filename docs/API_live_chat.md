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

## Redis Integration for Secure Chat
The live chat service utilizes Redis to maintain the state of active chat rooms, manage WebSocket channels, and ensure message synchronization across users. Here’s how Redis integrates with the live chat service:

1. Redis with Stunnel for Security: The live chat service uses Redis to manage real-time chat operations. To secure the connection between Django Channels and Redis, the Redis traffic is encrypted through Stunnel, which acts as a TLS proxy. Redis itself listens on a non-TLS port, while Stunnel handles the secure TLS layer.

2. Redis Channel Layer: The Django Channels library uses Redis as a channel layer, which enables the service to broadcast messages across multiple instances of the application if needed. Stunnel encrypts this communication, securing data flow from Django Channels to Redis.

3. How It Works:
- Stunnel listens on port 6380, configured to accept secure connections and forward them to Redis on its standard port (6379).
- When the chat service sends or receives messages, it connects to Redis via Stunnel using rediss://localhost:6380.
- This configuration ensures that all Redis-related traffic is encrypted, protecting sensitive chat data in transit.

4. Testing Secure Redis Connection: To confirm the Redis connection is secure, use redis-cli with TLS options:

```bash
redis-cli -h localhost -p 6380 --tls --cert /etc/stunnel/stunnel.crt --key /etc/stunnel/stunnel.key --cacert /etc/stunnel/stunnel.crt
```

You should see a prompt localhost:6380> indicating a secure connection. Use PING to confirm connectivity:

```plaintext
PING
```

* Expected Response:

```plaintext
PONG
```

## Summary for Frontend:

* WebSocket URL: Use wss://localhost:10443/ws/chat/{room_name}/ to securely connect to a chat room.
* Message Sending: Send messages as JSON over the WebSocket connection. For message reception, listen for events on the WebSocket stream.
* HTTP API: For fallback or testing, use the /chat/send/ endpoint to send messages via HTTPS.     ????? Check this

- Security Note: Always use HTTPS and securely manage any sensitive data transmitted over WebSocket or HTTPS connections.

Additional Notes:

* Self-Signed Certificate: In development environments, if using self-signed certificates, include the --no-check flag with wscat or set NODE_TLS_REJECT_UNAUTHORIZED=0 in your environment to avoid SSL verification errors.
