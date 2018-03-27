const path = require('path');
const db = require(path.join(__dirname, '../../database/index.js'));
const encrypt = require('../encryptor/index.js');
const uniqid = require('uniqid');


module.exports = {
  login: (data, callback) => {
    if (data.hasOwnProperty('email')) {
      db.query(`SELECT * FROM users WHERE users.email = '${data.email}'`, callback);
    }
  },

  search: (data, callback) => {
    // This can be used for Search later..
    db.query(`
      SELECT * FROM users
      INNER JOIN mixes
      WHERE
      users.genre = '${data}' OR
      users.firstname = '${data}' OR
      users.lastname = '${data}' OR
      mixes.id = '${data}'`
      , callback);
  },

  getUser: (data, callback) => {
    db.query(`
      SELECT
      firstname,
      lastname,
      displayname,
      profilepic
      FROM users WHERE id = '${data.id}'`,
      callback);
  },

  getTrackComments: (data, callback) => {
    let comments_type = data.isMix ? 'comments_mixes' : 'comments_mtracks';
    let type = data.isMix ? 'mixes' : 'multitracks';

    db.query(`
      SELECT
      ${comments_type}.comment,
      ${comments_type}.id,
      ${comments_type}.dt,
      users.displayname,
      users.profilepic
      FROM ${comments_type}
      INNER JOIN users
      WHERE ${comments_type}.trackId = '${data.id}'
      AND ${comments_type}.userId = users.id
      `, callback);
  },

  getTrack: (data, callback) => {
    let type = Boolean(data.isMix) ? 'mixes' : 'multitracks';

    db.query(`
      SELECT DISTINCT *, ${type}.id FROM ${type}
      INNER JOIN users
      WHERE ${type}.title = '${data.title}'
      AND users.displayname = ${type}.displayname`
      , callback);
  },

  getMixes: (data, callback, page) => {
    db.query(`SELECT * FROM mixes LIMIT 5 OFFSET ${page * 5}`, callback);
  },

  getMultiTracks: (data, callback, page) => {
    db.query(`SELECT * FROM multitracks LIMIT 5 OFFSET ${page * 5}`, callback);
  },

  getSession: (data, callback) => {
    if (data.hasOwnProperty('id')) {
      db.query(`
        SELECT * FROM users
        WHERE users.id = '${data.uid}' AND
        users.firstname = '${data.firstname}'`,
        callback);
    }
  },

  newUser: (data, callback) => {
    let pwSalt = encrypt.makeSaltSync();
    let pwHashed = encrypt.makeHashPw(data.pw, pwSalt);

    db.query(
      `INSERT INTO users (
        firstname,
        lastname,
        pw,
        email,
        genre,
        salt,
        profilepic,
        displayname
      ) VALUES (
        '${data.firstname}',
        '${data.lastname}',
        '${pwHashed}',
        '${data.email}',
        '${data.genre}',
        '${pwSalt}',
        '${data.profilepic}',
        '${data.displayname}'
      )`
    );
  },

  newMix: (data, callback) => {
    db.query(
      `INSERT INTO mixes (
        id,
        userId,
        file,
        artist,
        title,
        description,
        displayName,
        image,
        genre,
        isMix
      ) VALUES (
        '${uniqid(String(data.userId))}',
        ${data.userId},
        '${data.file}',
        '${data.artist}',
        '${data.title}',
        '${data.description}',
        '${data.displayName}',
        '${data.image}',
        '${data.genre}',
        ${data.isMix}
      )`
    );
  },

  newMultitrack: (data, callback) => {
    db.query(
      `INSERT INTO multitracks (
        id,
        userId,
        files,
        artist,
        title,
        description,
        displayName,
        image,
        genre,
        previewFile,
        isMix
      ) VALUES (
        '${uniqid(String(data.userId))}',
        ${data.userId},
        '${data.files}',
        '${data.artist}',
        '${data.title}',
        '${data.description}',
        '${data.displayName}',
        '${data.image}',
        '${data.genre}',
        '${data.previewFile}',
        ${data.isMix}
      )`
    );
  }
}
