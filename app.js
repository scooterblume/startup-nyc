var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var index = require('./routes/index');
var users = require('./routes/users');



// view engine setup
app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



////streaming////////////////
var scream =0;
var tear = 0;
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

////////////////end streaming////////////////

module.exports = app;



server.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


