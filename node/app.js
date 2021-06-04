const express = require('express');

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

io.on('connection', (socket) => { 
    socket.on('server message', function(data){
    $('#chatLog').append('<li> '+ data.username +' : ' + data.message + ' </li>');
 });

socket.on('join', function(data){
    $('#chatLog').append('<li> ' + data.username + '님이 방을 들어왔습니다 </li>');
});

socket.on('leave', function(data){
    $('#chatLog').append('<li> ' + data.username + '님이 방을 나갔습니다 </li>');
});

    //console.log("소켓 작동");
    socket.on('client message', (data) => {
        io.emit('server message', {
            message : data.message
        });
    });

});