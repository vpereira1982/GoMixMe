const mysql = require('mysql');

// local host dev environment
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'userbase'
});

const db = mysql.createConnection(awsDb);
db.connect();

module.exports = db;
