const express = require('express');
const redis = require('socket.io-redis');

const app = express();
const port = 3000;

// index파일로 넘겨줌
app.get('/', ( _ ,res) => {
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen( port, () => {
    console.log('Express listening on port', port);
});

const listen = require('socket.io');
const io = listen(server);
io.adapter(redis({ host: 'redis', port: 6379 }));

// 랜덤이름 설정
const color = [
    "yellow",
    "green",
    "red",
    "blue",
    "white",
    "black",
]

io.on('connection', (socket) => { 
    // 이름 6개중 랜덤으로 설정
    const username = color[ Math.floor(Math.random() * 6) ];

    // username 출력
    socket.broadcast.emit( 'join',  {  username  } );

    // username과 message 방출
    socket.on('client message', (data) => {
        io.emit('server message', {
            username ,
            message : data.message
        });
    });

    //방을 떠나면 이름과 함께 나갔다는 표시
    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { username });
    });

});