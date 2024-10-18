## WebSocket API for Chat

Endpoint URL:
Example ----
ws://localhost:8000/ws/chat/<room_name>/ ||
use this one for a test name:
```bash
ws://localhost:8000/ws/chat/testroom/
```

## How to open WebSocket connection:
1. Use JavaScript to open a WebSocket connection:
```plaintext
const roomName = "testroom";
const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

// When the connection opens
ws.onopen = function () {
    console.log("WebSocket connected.");
};

// When a new message is received
ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log("Received message:", data.message);
};

// If the connection is closed
ws.onclose = function () {
    console.log("WebSocket closed.");
};

// If there's an error
ws.onerror = function (event) {
    console.error("WebSocket error:", event);
};
```

## How to Send a Message:
- Send a message to the chat room by calling send() with the message in JSON format.
```plaintext
const message = { message: "Hello World" };
ws.send(JSON.stringify(message));
```
## How to Receive a Message:
- When the server sends a message, it will automatically appear in the onmessage event. You can log or display it like this:

```plaintext
ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log("New message:", data.message);
};
```

## How to Close the WebSocket Connection:

- To close the connection when the user leaves the chat:

```plaintext
ws.close();
```

Summary

- Open WebSocket: Use the WebSocket URL ws://localhost:8000/ws/chat/<room_name>/.
- Send Messages: Use ws.send() to send a message in JSON format.
- Receive Messages: Handle incoming messages in the ws.onmessage event.
- Close WebSocket: Use ws.close() when done.

---------

Here’s how you can handle the message sending and receiving on the frontend:

1. Open the WebSocket connection when the user enters the chat room:

```plaintext
const roomName = "testroom";
const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
```

2. Sending messages from the text box:
- Attach an event listener to the "send" button or the Enter key.
- When the user types a message, you can get the value from the text box and send it like this:

```plaintext
document.getElementById("sendBtn").addEventListener("click", function() {
    const messageInput = document.getElementById("messageInput").value;
    const messageData = {
        username: "currentUser",  // Replace this with the actual logged-in user's name
        message: messageInput
    };
    ws.send(JSON.stringify(messageData));
});
```

3. Receiving messages and displaying them:
- The WebSocket will receive a message as JSON, which includes both the message and the username. You can extract and display them like this:

```plaintext
ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    const message = data.message;
    const username = data.username;

    // Append message to chat window
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<strong>${username}:</strong> ${message}<br>`;
};
```

4. Username handling:
- The backend will send the username along with each message. Use that username to display the sender’s name next to their message in the chat window.
