const mysql = require('mysql');

// local host dev environment
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'userbase'
});

db.connect();

module.exports = db;
