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

    try {
        const { messageType, data, conversationIndex, uuid, visemes } = JSON.parse(message);

        if (messageType === "emotionsNonSpeaking") {
            console.log('Received message:', JSON.parse(message));
            for (let targets of visemes) {
                console.log(targets)
            }
        } else {


            if (messageType === "updateThread" && uuid) {
                senderWs.send(JSON.stringify({
                    messageType: "updateThread",
                    numberOfVisemesPlayed: visemes.length,
                    uuid
                }));
            }


        }


        // Save the message to a JSON file

        // Broadcast the message to all connected clients
        // wss.clients.forEach((client) => {
        //     client.send(message);
        // });
    } catch (e) {
        console.log(e)
    }
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
