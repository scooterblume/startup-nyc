var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));


app.use(express.static('public'));
// server code goes here!

var tear =0;
var scream =0;

io.on('connection',function(socket){
	console.log('connected');
	socket.emit('tick')

	socket.on('scream',function(){
		console.log('scream clicked')
		scream+=10;
		socket.emit('movScr',scream);
	});

	socket.on('tear',function(){
		console.log('tears clicked')
		tear += 10;
		socket.emit('movTear',tear);
	});

	socket.on('tick',function(){
		var info = [tear,scream];
		socket.emit('tick', info);
	});

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});