const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let count = 0;
// Serve a basic route
app.get('/', (req, res) => {
res.send('WebSocket Server Running with Express!');
});
wss.on('connection', function connection(ws) {
ws.send(JSON.stringify({ type: 'count', data: count }));
ws.on('message', function incoming(message) {
const data = JSON.parse(message);
if (data.type === 'increment') {
count += data.value;
wss.clients.forEach(client => {
if (client.readyState === WebSocket.OPEN) {
client.send(JSON.stringify({ type: 'count', data: count }));
}
});
} else if (data.type === 'reset') {
count = 0;
wss.clients.forEach(client => {
if (client.readyState === WebSocket.OPEN) {
client.send(JSON.stringify({ type: 'count', data: count }));
}
});
}
});
});
// Start the server on port 9090
server.listen(9090, '10.0.98.137', () => {
console.log('Server is running on http://10.0.98.137:9090');
});
