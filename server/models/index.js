const path = require('path');
const db = require(path.join(__dirname, '../../database/index.js'));
const encrypt = require('../encryptor/index.js');
const uniqid = require('uniqid');
const escaper = str => str.replace(/[!'<>`()*]/g,"\\$&");

module.exports = {
  login: (data, callback) => {
    if (data.hasOwnProperty('email')) {
      db.query(`
        SELECT * FROM users WHERE users.email = '${data.email}'`,
        callback);
    }
  },

  getUser: (data, callback) => {
      db.query(`
      (
        SELECT
          umx.firstname,
          umx.lastname,
          umx.id,
          umx.displayname,
          umx.profilepic,
          umx.description,
          umx.genre,
          'mixes' AS 'src',
          mx.artist,
          mx.image,
          mx.genre,
          0 as previewFile,
          mx.file,
          mx.title,
          mx.id
        FROM users umx
        JOIN mixes mx
        ON mx.userId = umx.id
        WHERE umx.displayname = '${data.displayname}'
        ORDER BY
          mx.artist,
          mx.title,
          mx.id
      )
      UNION
      (
        SELECT
          umt.firstname,
          umt.lastname,
          umt.id,
          umt.displayname,
          umt.profilepic,
          umt.description,
          umt.genre,
          'multitracks' AS 'src',
          mt.artist,
          mt.image,
          mt.genre,
          mt.previewFile,
          mt.files,
          mt.title,
          mt.id
        FROM users umt
        JOIN multitracks mt
        ON mt.userId = umt.id
        WHERE umt.displayname = '${data.displayname}'
        ORDER BY
          mt.artist,
          mt.title
      )
      UNION
      (
        SELECT
          umt.firstname,
          umt.lastname,
          umt.id,
          umt.displayname,
          umt.profilepic,
          umt.description,
          umt.genre,
          'none' AS 'src',
          'none' AS 'artist',
          'none' AS 'image',
          'none' AS 'track_genre',
          'none' AS 'previewFile',
          'none' AS 'files',
          'none' AS 'title',
          'none' AS 'id'
        FROM users umt
        WHERE umt.displayname = '${data.displayname}'
      )
      `,
      callback);
  },

  getTrackComments: (data, callback) => {
    let isMix = JSON.parse(data.isMix);
    let comments_type = isMix ? 'comments_mixes' : 'comments_mtracks';
    let type = isMix ? 'mixes' : 'multitracks';

    db.query(`
      SELECT
      ${comments_type}.comment,
      ${comments_type}.id,
      ${comments_type}.dt,
      users.displayname,
      users.profilepic
      FROM ${comments_type}
      INNER JOIN users
      WHERE ${comments_type}.trackId = '${data.id || data.trackId}'
      AND ${comments_type}.userId = users.id
      ORDER BY ${comments_type}.dt DESC`,
      callback);
  },

  getTrack: (data, callback) => {
    let type = JSON.parse(data.isMix) ? 'mixes' : 'multitracks';

    db.query(`
      SELECT DISTINCT *, ${type}.description, ${type}.id, NULL as pw, NULL as salt
      FROM ${type}
      INNER JOIN users
      WHERE ${type}.title = '${escaper(data.title)}'
      AND users.displayname = ${type}.displayname`,
      callback);
  },

  getMixes: (search, callback, page) => {
    if (!search) {
      db.query(`SELECT * FROM mixes LIMIT 5 OFFSET ${page * 5}`, callback);
    } else {
      db.query(`
        SELECT * FROM mixes
        WHERE (title LIKE '%${search}%' OR artist LIKE '%${search}%')
        LIMIT 10 OFFSET ${page * 10}`,
        callback);
    }
  },

  getMultiTracks: (search, callback, page) => {
    if (!search) {
      db.query(`SELECT * FROM multitracks LIMIT 5 OFFSET ${page * 5}`, callback);
    } else {
      db.query(`
        SELECT * FROM multitracks
        WHERE (title LIKE '%${search}%' OR artist LIKE '%${search}%')
        LIMIT 10 OFFSET ${page * 10}`,
        callback);
    }
  },

  getSession: (data, callback) => {
    let hasId = Object.prototype.hasOwnProperty.call(data, 'id');
    if (hasId) {
      db.query(`
        SELECT * FROM users
        WHERE users.id = '${data.uid}' AND
        users.firstname = '${data.firstname}'`,
        callback);
    }
  },

  updateUser: (data, callback) => {
    let pwSalt = encrypt.makeSaltSync();
    let pwHashed = encrypt.makeHashPw(data.pw, pwSalt);
    let hasNewPic = Object.prototype.hasOwnProperty.call(data, 'profilepic');

    db.query(`
      UPDATE users
        SET firstname = '${escaper(data.firstname)}',
        lastname = '${escaper(data.lastname)}',
        pw = CASE WHEN ${data.pw.length} > 1 THEN '${pwHashed}' ELSE pw END,
        email = '${escaper(data.email)}',
        genre = '${data.genre}',
        salt = CASE WHEN ${data.pw.length} > 1
          THEN '${pwSalt}'
          ELSE salt END,
        profilepic = CASE WHEN ${hasNewPic}
          THEN '${data.profilepic}'
          ELSE profilepic END,
        description = '${escaper(data.description)}'
        WHERE id = ${data.id}`,
      callback);
  },

  newComment: (data, callback) => {
    let { trackId, comment, userId } = data;
    let comments_type = data.isMix ? 'comments_mixes' : 'comments_mtracks';

    db.query(`
      INSERT INTO ${comments_type} (
        trackId,
        comment,
        userId,
        dt
      ) VALUES (
        '${trackId}',
        '${escaper(comment)}',
        ${userId},
        NOW())`,
      callback);
  },

  checkNewUser: (data, callback) => {
    db.query(`(
      SELECT email AS 'value', 'email' AS 'type'
        FROM users WHERE email = '${data.email}'
      ) UNION ALL (
      SELECT displayname, 'displayname' AS 'type'
        FROM users WHERE displayname = '${data.displayname}')`,
      callback);
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
        description,
        displayname
      ) VALUES (
        '${escaper(data.firstname)}',
        '${escaper(data.lastname)}',
        '${pwHashed}',
        '${escaper(data.email)}',
        '${data.genre}',
        '${pwSalt}',
        '${data.profilepic}',
        '${escaper(data.description)}',
        '${escaper(data.displayname)}'
      )`,
      callback);
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
        '${escaper(data.artist)}',
        '${escaper(data.title)}',
        '${escaper(data.description)}',
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
        '${escaper(data.artist)}',
        '${escaper(data.title)}',
        '${escaper(data.description)}',
        '${data.displayName}',
        '${data.image}',
        '${data.genre}',
        '${data.previewFile}',
        ${data.isMix}
      )`
    );
  }
}
