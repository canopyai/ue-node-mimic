const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080, host: '0.0.0.0' });

const senderUrl = "ws://34.91.59.59:8080";

wss.on('connection', (ws) => {
    console.log('A client has connected.');

    // Open a connection to the server URL
    const senderWs = new WebSocket(senderUrl);

    senderWs.on('open', () => {
        console.log('Connected to server URL:', senderUrl);
    });
    
    senderWs.on('message', (message) => {
        console.log('Received message from server URL:', message);
        ws.send(message);
    });

    senderWs.on('close', () => {
        console.log('Disconnected from server URL:', senderUrl);
    });

    ws.on('close', () => {
        console.log('A client has disconnected.');

        // Close the connection to the server URL when the client disconnects
        senderWs.close();
    });
});