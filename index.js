var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    //res.send('<h1>Hello world</h1>');
    res.sendFile(__dirname + '/index.html')
});


io.on('connection',function(socket){
    console.log('a user connected');
    socket.broadcast.emit('hi');
    socket.on('chat message',function(msg){
        console.log('msg: ' + msg);
        io.emit('chat message', msg);

    });


    socket.on('disconnect',function(){
        console.log('Bye...');
    });
});

http.listen(3001, function(){
    console.log('listening on *:3001');
});
