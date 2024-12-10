# Chat Application Readme

Welcome to the Chat Application! This application provides a simple yet powerful messaging platform where you can communicate with other users in three distinct ways: **Direct Messages (Whispers)**, **Tournament Group Messages**, and **General Chat Messages**.

---

## Features

1. **Direct Messaging (Whisper)**  
   Send a private message directly to another user using the `/user` command. Only the specified user will see the message.  

2. **Tournament Group Messaging**  
   Share messages with the members of the tournament group using the `/tournament` command. Messages sent in this mode will be visible to everyone in the tournament group.  

3. **General Chat Messaging**  
   Send a message to all users in the chat without using any command. This is the default communication mode.

---

## How to Use

### Commands

1. **Whisper (Direct Message)**  
   To send a private message to a specific user:  
```
/username message
```
- Replace `username` with the recipient's username.
- Replace `message` with your desired text.  

**Example:**  
```
/john Hello, how are you?
```
*This will send "Hello, how are you?" as a direct message to the user named `john`.*

---

2. **Tournament Group Message**  
To send a message to the tournament group:
```
/tournament message
```
- Replace `message` with your desired text.

**Example:**  
```
/tournament Let’s coordinate the next round!
```
*This will send "Let’s coordinate the next round!" to all users in the tournament group.*

---

3. **General Chat Message**  
To send a message to all users:  
Simply type your message without any command.  

**Example:**
```
Hello everyone!
```
*This will send "Hello everyone!" to all connected users.*

---

## Filters

You can filter chat messages based on their type:  
- **General**: Shows all general messages.  
- **Whisper**: Displays only direct messages you have sent or received.  
- **Tournament**: Displays messages sent in the tournament group.  

Use the checkbox filters at the top of the chat to toggle message visibility.

---

## Testing the Chat Application

For the initial test of the application, you can use the **mock server** included in the frontend directory. To get started:

1. **Navigate to the Frontend Directory**  
Go to the directory where the frontend application is located.  

2. **Build and Run the Mock Server Docker Container**  
The mock server is provided with a `Dockerfile`, and you can build and run it manually using the following steps:

- Ensure that **Docker** is installed and running on your system.
- Open a terminal and navigate to the `frontend` directory.
- Build the Docker image:

  ```bash
  docker build -t ws-mock-server .
  ```

- Once the image is built, run the Docker container:

  ```bash
  docker run -p 8888:8888 ws-mock-server
  ```

This will start the WebSocket mock server on `ws://localhost:8888`. The server will simulate WebSocket communication and allow you to test the chat functionalities in real-time.

---

Enjoy your chat experience! 🚀  
For any issues or feedback, please contact the development team.



