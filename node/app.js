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
    //console.log("소켓 작동");
    socket.on('client message', (data) => {
        //전체 메세지 뿌려줌
        console.log(data.message);
    //     io.emit('server message', {
    //         message : data.message
    //     });
    });

});