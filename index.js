const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8080, host: '0.0.0.0' });

const senderUrl = "ws://34.91.59.59:8080";

// Open a connection to the server URL
const senderWs = new WebSocket(senderUrl);

senderWs.on('open', () => {
    console.log('Connected to server URL:', senderUrl);
});

senderWs.on('message', (message) => {
    console.log('Received message from server URL:', JSON.parse(message));

    const {messageType, data, conversationIndex} = JSON.parse(message);

    if(messageType === "clearQueue") {
        console.log("conv index cutoff", conversationIndex)
    } else {
        console.log("animationDataIndex", conversationIndex)
    }


    // Save the message to a JSON file

    // Broadcast the message to all connected clients
    // wss.clients.forEach((client) => {
    //     client.send(message);
    // });
});

senderWs.on('close', () => {
    console.log('Disconnected from server URL:', senderUrl);
});

wss.on('connection', (ws) => {
    console.log('A client has connected.');

    ws.on('close', () => {
        console.log('A client has disconnected.');
    });
});
