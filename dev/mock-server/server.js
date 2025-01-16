const WebSocket = require('ws');

const PORT = process.env.PORT || 8888;

const wss = new WebSocket.Server({ port: PORT }, () => {
    //console.log(`WebSocket mock server is running on ws://localhost:${PORT}`);
});

// Store all connected clients
const clients = [];

wss.on('connection', (ws) => {
    //console.log('Client connected');

    // Add new client to the clients array
    clients.push(ws);

    // Listen for messages from clients
    ws.on('message', (message) => {
        //console.log(`Received from client: ${message}`);
    
        try {
            // Parse the message if it's a JSON string
            const parsedMessage = JSON.parse(message);
    
            // Ensure `parsedMessage.content` exists before sending a response
            if (parsedMessage.content) {
                // Broadcast the message to all connected clients
                clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(
                            JSON.stringify({
                                type: parsedMessage.type,
                                from: parsedMessage.from,
                                to: parsedMessage.to,
                                content: parsedMessage.content, // Use parsed content
                                timestamp: new Date().toISOString(),
                            })
                        );
                    }
                });
            } else {
                console.error('Message content is missing');
            }
        } catch (error) {
            // If the message is not valid JSON, handle gracefully
            console.error('Invalid message format', error);
        }
    });

    // Remove the client from the clients array when they disconnect
    ws.on('close', () => {
        //console.log('Client disconnected');
        const index = clients.indexOf(ws);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});
