var todosAPI = {
  getTodos: function (connection, callback) {
    connection.query('select id, name, done from todosTable', function (err, rows, fields) {
      if (!err) {
        callback(rows)
      } else {
        console.warn('Error in getTodos')
        callback(null)
      }
    })
  },

  insertTodo: function (connection, newTodo, callback) {
    connection.query("INSERT INTO todosTable(Done, Name) VALUES('0','" + newTodo + "')", function (err, rows, fields) {
      if (!err) {
        console.log(newTodo)
        callback(rows)
      } else {
        console.warn(err, 'Error in insertTodo')
        callback(null)
      }
    })
  },

  deleteTodo: function (connection, id, callback) {
    console.log(id)
    // if (!id) {
    connection.query('DELETE from todosTable where (id=' + parseInt(id) + ')', function (err, rows, fields) {
      if (!err) {
        callback(rows)
      } else {
        console.warn(err, 'Error in deleteTodo')
        callback(null)
      }
    })
  // }
  },

  deleteTodos: function (connection, callback) {
    connection.query('DELETE from todosTable', function (err, rows, fields) {
      if (!err) {
        callback(rows)
      } else {
        console.warn('Error in deleteTodos')
        callback(null)
      }
    })
  },

  getUsers: function (connection, callback) {
    connection.query('select user_Id, LastName, FirstName, City from usersTable', function (err, rows, fields) {
      if (!err) {
        callback(rows)
      } else {
        console.warn('Error in getTodos')
        callback(null)
      }
    })
  },

  getUserTodos: function (connection, id, callback) {
    var statment = 'SELECT user_Id, LastName, FirstName, Name\
FROM usersTable INNER JOIN (todosTable INNER JOIN userTodosTable\
 ON todosTable.Id = userTodosTable.Todo_Id) ON usersTable.user_Id =\
  userTodosTable.user_Id WHERE (user_Id=' + parseint(id) + ')'
    connection.query(statment, function (err, rows, fields) {
      if (!err) {
        callback(rows)
      } else {
        console.warn('Error in getTodos')
        callback(null)
      }
    })
  }
}

module.exports.todosAPI = todosAPI
