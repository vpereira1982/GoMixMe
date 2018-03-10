let path = require('path');
let db = require(path.join(__dirname, '../../database/index.js'));
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
    if (data.hasOwnProperty('id')) {
      db.query(`SELECT * FROM users WHERE users.id = '${data.uid}' AND users.firstname = '${data.firstname}'`, callback);
    }
  },

  newUser: (data, callback) => {
    let pwSalt = encrypt.makeSaltSync();
    let pwHashed = encrypt.makeHashPw(data.pw, pwSalt);

    let queryString = `INSERT INTO users (firstname, lastname, pw, email, genre, salt, profilepic) VALUES ('${data.firstname}','${data.lastname}','${pwHashed}','${data.email}','${data.genre}','${pwSalt}', '${data.profilepic}');`

    db.query(queryString);
  },

  newMix: (data, callback) => {
    console.log('it gets here in the model.. newMix')
    db.query(
      `INSERT INTO mixes (
      userid,
      file,
      artist,
      title,
      description,
      image,
      genre
      ) VALUES (
      '${data.userId}',
      '${data.file}',
      '${data.artist}',
      '${data.title}',
      '${data.description}',
      '${data.image}',
      '${data.genre}')`
    );
  }
}


module.exports = obj;

// CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(30), lastname VARCHAR(30), pw VARCHAR(30), email VARCHAR(255), genre VARCHAR(30), salt VARCHAR(255));
