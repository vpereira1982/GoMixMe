let db = require('../database/index.js');
let encrypt = require('../encryptor/index.js');

let obj = {
  get: (data, callback) => {
    if (data.hasOwnProperty('email')) {
      db.query(`SELECT * FROM users WHERE users.email = '${data.email}'`, callback);
    } else if (data.hasOwnProperty('query')) {
      db.query(`SELECT * FROM users WHERE users.genre = '${data.query}' OR users.firstname = '${data.query}' OR users.lastname = '${data.query}'`, callback);
    } else {
      db.query(`SELECT * FROM users`, callback);
    }
  },

  getSession: (data, callback) => {
    if (data.hasOwnProperty('localStorage')) {
      db.query(`SELECT * FROM users WHERE users.id = '${data.localStorage}'`, callback);
    }
  },

  post: (data, callback) => {
    console.log('this is the signup data', data);
    let pwSalt = encrypt.makeSaltSync();
    let pwHashed = encrypt.makeHashPw(data.pw, pwSalt);

    let queryString = `INSERT INTO users (firstname, lastname, pw, email, genre, salt, file) VALUES ('${data.firstname}','${data.lastname}','${pwHashed}','${data.email}','${data.genre}','${pwSalt}', '${data.file}');`

    db.query(queryString);
  }
}


module.exports = obj;

// CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(30), lastname VARCHAR(30), pw VARCHAR(30), email VARCHAR(255), genre VARCHAR(30), salt VARCHAR(255));
