const mySql = require('mysql2')
const connection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tasks-manager'
})

module.exports = connection;