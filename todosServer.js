var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var mysql = require('mysql')
var todosAPI = require('./todosAPI').todosAPI

// Try this out - guess what it prints before you uncomment it!
// console.log(todosAPI)

// Create a new application.
var app = express()

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yonas',
  database: 'todos'
})

connection.connect(function (err) {
  if (!err) {
    console.log('Database is connected ...')
  } else {
    console.log('Error connecting database ...')
  }
})
// Use body parser middleware.
app.use(bodyParser.json())

// Send HTML file
app.get('/', function (request, response) {
  response.sendFile('./index.html', {root: __dirname})
})

// Actions
app.get('/todo', function (request, response) {
  var id = request.params.id

  var rows = todosAPI.getTodos(connection, function (rows) {
    // Make sure you change the database results (rows) below into the example,
    // otherwise the html website won't work
    // if (!!err) {
    var resultTodos = []

    for (var i = 0; i < rows.length; i++) {
      // resp.send(rows)
      var responseBody = {'Id': rows[i].id,
        'Name': rows[i].name,
      'Done': rows[i].done}
      resultTodos.push(responseBody)
    }

    // console.log(resultTodos)
    response.send(resultTodos)
    response.end()
  // }else {
  //  console.log(err, 'Error in getTodos.')
  // }
  })
})

// Insert a todo
app.post('/todo', function (request, response) {
  var todo = request.body
  if (todo.text == null || todo.text == '') {
    sendError(response, 400, 'No text specified')
  } else {
    // Insert it using the todosAPI insertTodo function
    todosAPI.insertTodo(connection, todo.text, function (rows) {
      console.log(todo.text, 'Successfuly Added.')
    })
  }
})

// Delete a todo
app.delete('/todo/:id', function (request, response) {
  var id = request.params.id

  // Delete it using the todosAPI deleteTodo function
  todosAPI.deleteTodo(connection, id, function (rows) {
    console.log('Successfully deleted todo # ' + id)
  })
})

// Delete all todos
app.delete('/todo', function (request, response) {
  var id = request.params.id

  // Delete it using the todosAPI deleteTodos function
  todosAPI.deleteTodos(connection, function (rows) {
    console.log('Deleted All Todos.')
  })
  response.status(204).send()
})

// Update a todo
app.put('/todo/:id', function (request, response) {
  var id = request.params.id

// Update it using the todosAPI updateTodo function
})

app.get('/users', function (request, response) {
  var rows = todosAPI.getUsers(connection, function (rows) {
    var resultUsers = []

    for (var i = 0; i < rows.length; i++) {
      var responseBody = {'User Id': rows[i].user_Id,
        'LastName': rows[i].LastName,
        'FirstName': rows[i].FirstName,
      'City': rows[i].City}
      resultUsers.push(responseBody)
    }

    // console.log(resultUsers)
    response.send(resultUsers)
    response.end()
  })
})

app.get('/user/todos/:id', function (request, response) {
  var id = request.params.id
  var rows = todosAPI.getUserTodos(connection, id, function (rows) {
    var resultUsers = []

    for (var i = 0; i < rows.length; i++) {
      var responseBody = {'User Id': rows[i].user_Id,
        'LastName': rows[i].LastName,
        'FirstName': rows[i].FirstName,
      'Todo': rows[i].Name}
      resultUsers.push(responseBody)
    }

    // console.log(resultUsers)
    response.send(resultUsers)
    response.end()
  })
})

function sendError (response, code, message) {
  response.statusCode = code
  response.json({
    error: message
  })
  response.end()
}

// Start the server.
app.listen(8080)
console.log('Listening to port 8080')
