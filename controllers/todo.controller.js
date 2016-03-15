var Todo = require('../models/todo.model.js');
var todoCtrl = {
  getAll: getAllTodos,
  create: createTodo,
  update: updateTodo,
  delete: deleteTodo
};

function getAllTodos(req, res){
  Todo.find(function(err,todos){
    if(err) throw err;
    res.json(todos);
  });
};

function createTodo(req, res){
  var desc = req.body.desc;
  var todoObj = {
    desc: desc,
    completed: false // or completed if you want to allow the user to post a completed tado
  };
  Todo.create(todoObj, function(err, todo){
    if(err) throw err;

    res.json(todo);
  });
};

function updateTodo(req, res){
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
};

function deleteTodo(req, res){
  var id = req.params.id;
  Todo.findOneAndRemove({_id: id}, function(err, todo){
    if(err) throw err;

    res.json(todo);
  });
};

module.exports = todoCtrl;
