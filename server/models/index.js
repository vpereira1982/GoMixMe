let path = require('path');
let db = require(path.join(__dirname, '../../database/index.js'));
let encrypt = require('../encryptor/index.js');

module.exports = {
  login: (data, callback) => {
    if (data.hasOwnProperty('email')) {
      db.query(`SELECT * FROM users WHERE users.email = '${data.email}'`, callback);
    }
  },

  search: (data, callback) => {
    // This can be used for Search later..
    if (data.hasOwnProperty('query')) {
      db.query(`SELECT * FROM users WHERE users.genre = '${data.query}' OR users.firstname = '${data.query}' OR users.lastname = '${data.query}'`, callback);
    }
  },

  getMixes: (data, callback, page) => {
    db.query(`SELECT * FROM mixes LIMIT 5 OFFSET ${page * 5}`, callback);
  },

  getMultiTracks: (data, callback, page) => {
    db.query(`SELECT * FROM multitracks LIMIT 5 OFFSET ${page * 5}`, callback);
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
        console.log('inside model', data.isMix)

    db.query(
      `INSERT INTO mixes (
      userId,
      file,
      artist,
      title,
      description,
      image,
      genre,
      isMix
      ) VALUES (
      ${data.userId},
      '${data.file}',
      '${data.artist}',
      '${data.title}',
      '${data.description}',
      '${data.image}',
      '${data.genre}',
      ${data.isMix}
      )`
    );
  },


  newMultitrack: (data, callback) => {
    db.query(
      `INSERT INTO multitracks (
      userId,
      files,
      artist,
      title,
      description,
      image,
      genre,
      previewFile,
      isMix
      ) VALUES (
      ${data.userId},
      '${data.files}',
      '${data.artist}',
      '${data.title}',
      '${data.description}',
      '${data.image}',
      '${data.genre}',
      '${data.previewFile}',
      ${data.isMix}
      )`
    );
  }
}
