var express = require('express'),
    logger  = require('morgan')('dev'),
    path    = require('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bodyParser = require('body-parser'),
    server  = express(),
    Todo = require('./models/todo.model.js');
    TodoCtrl = require('./controllers/todo.controller.js');

// Create a connection to our database
mongoose.connect('mongodb://localhost/todoApp')

var port = process.env.PORT || 9000;

server.use(express.static(path.join(__dirname,'public')));
server.use(logger);
server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

server.get('/', function(req, res){
  res.sendFile('/public/html/index.html', {root:__dirname});
});

server.post('/api/todos', TodoCtrl.create);       // Create  (C)
server.get('/api/todos', TodoCtrl.getAll);        // Read    (R)
server.put('/api/todos/:id', TodoCtrl.update);    // Update  (U)
server.delete('/api/todos/:id', TodoCtrl.delete); // Delete  (D)

server.listen(port, function(){
  console.log('Now listening on port ' + port);
});
