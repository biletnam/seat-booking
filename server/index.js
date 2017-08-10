const path    = require('path');
const app     = require('express')();
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);
const booking = require('./booking');

booking.init(io);

app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, '../client/dist'));
});

server.listen(3000);
