const express = require('express');
const redis = require('socket.io-redis');
const app = express();
const port = 3000;

app.get('/', ( _ ,res) => {
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen( port, () => {
    console.log('Express listening on port', port);
});

const listen = require('socket.io');
const io = listen(server);
io.adapter(redis({ host: 'redis', port: 6379 }));

const color = [
    "아무개",
    "빵빵",
    "와우리리잉",
    "키키킹",
    "킹콩",
    "화채",
]

io.on('connection', (socket) => { 
    const username = color[ Math.floor(Math.random() * 6) ];
    socket.broadcast.emit( 'join',  {  username  } );

    socket.on('client message', (data) => {
        io.emit('server message', {
            username ,
            message : data.message
        });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { username });
    });
});