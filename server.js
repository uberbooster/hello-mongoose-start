var express = require('express'),
    logger  = require('morgan')('dev'),
    path    = require('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bodyParser = require('body-parser'),
    server  = express(),
    Todo = require('./models/todo.model.js');







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

server.post('/api/todos', function(req, res){
  var desc = req.body.desc;
  // var completed = req.body.completed;
  var todoObj = {
    desc: desc,
    completed: false // or completed if you want to allow the user to post a completed tado
  };
  Todo.create(todoObj, function(err, todo){
    if(err) throw err;

    res.json(todo);
  });
  //res.json(req.body); returns itself
}); // Create  (C)

server.get('/api/todos', function(req, res){
  Todo.find(function(err,todos){
    if(err) throw err;
    res.json(todos);
  });
}); // Read    (R)

server.put('/api/todos/:id', function(req, res){
  res.send('I updated a todo');
  var id =  req.params.id;
  var desc = req.body.desc;
  var completed = req.body.completed;
  var update = {
    desc: desc,
    completed: completed
  }
  Todo.findOneByIdAndUpdate({_id:id}, update, {new: true}, function(err, todo){
    if(err) throw err;

    res.json(todos);
  })
}); // Update  (U)

server.delete('/api/todos/:id', function(req, res){
  res.send('I deleted a todo');
}); // Delete  (D)

server.listen(port, function(){
  console.log('Now listening on port ' + port);
});
