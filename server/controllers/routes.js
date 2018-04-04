const express = require('express');
const path = require('path');
const model = require('../models/index.js');
const bodyParser = require('body-parser');
const encrypt = require('../encryptor/index.js');
const router = express.Router();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const multer = require('multer');
const multerFields = require('./multerFields.js');
const archiver = require('archiver');
const fs = require('fs');

// MULTER SETUP
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../userfiles'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_'+ file.originalname);
  }
})
const upload = multer({storage}).fields(multerFields);


// SESSION SETTINGS
router.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  cookie: {maxAge: new Date() * 60 * 60 * 24},
  resave: false,
  store: new FileStore()
}));


// MIDDLEWARE
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(upload);
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*****************
    ROUTING
*****************/

// USER MANUAL LOGIN
router.post('/login', (req, res) => {
  let query = req.body;

  model.login(query, (err, data) => {
    if (err) throw err;

    let pwHashed = typeof data[0] === 'object' ?
     encrypt.makeHashPw(query.pw, data[0].salt) : false;

    if (pwHashed && pwHashed === data[0].pw) {
      req.session.uid = data[0].id;
      req.session.firstname = data[0].firstname;
      res.status(201).send(JSON.stringify(data[0]));
    } else {
      res.status(401).send(false);
    }
  });
});

// USER SESSION LOGIN
router.get('/session', (req, res) => {
  model.getSession(req.session, (err, data) => {
    if (data.length === 0) {
      res.send(false);
    }
    !data[0] ? res.end() : res.send(JSON.stringify(data[0]));
  });
})

// MAIN TRACKLIST
router.get('/tracks', (req, res) => {
  let { search, page } = req.query;
  let dbQueries = new Promise((resolve, reject) => {
    // pull Mixes from db
    model.getMixes(search, (err, data) => {
      if (err) reject(err);
      resolve(data)
    }, page);
  });

  dbQueries.then((mixes) => {
      // pull Multitracks from db
      model.getMultiTracks(search, (err, data) => {
        if (err) throw err;
        let tracks = JSON.stringify({mixes, multitracks: data});
        res.status(200).send(tracks);
      }, page);
    })
    .catch((err) => {
      res.status(404).send('Db tracks queries failed');
    });
});

// DOWNLOAD MT FILES
router.get('/download', (req, res) => {
  let zip = archiver('zip');
  let playlist = Object.values(req.query);
  let zippedFile = fs.createWriteStream(__dirname + '/multitrack-files.zip');

  playlist.forEach(each => {
    each = JSON.parse(each);
    let filePath = path.join(__dirname, '../..' + each['url'].slice('http://127.0.0.1:8080'.length));
    zip.append(fs.createReadStream(filePath), { name: each['title'] });
  });

  // pipe the read-stream to the ZippedFile write-stream
  zip.pipe(zippedFile)

  zippedFile.on('finish', (err) => {
    // unlinkSync deletes file after sending
    res.download(zippedFile.path);
    fs.unlinkSync(zippedFile.path);
  });

  zip.finalize();
});


// PULL TRACK INFO
router.get('/trackDetails', (req, res) => {
  model.getTrack(req.query, (err, data) => {
    if (err) throw (err);
    res.status(200).send(data);
  });
});


// PULL TRACK COMMENTS
router.get('/trackComments', (req, res) => {
  model.getTrackComments(req.query, (err, data) => {
    if (err) throw (err);
    res.status(200).send(data);
  });
});


// ADD NEW COMMENT
router.post('/addNewComment', (req, res) => {
  model.newComment(req.body, (err, data) => {
    if (err) throw (err);
    res.status(201).send('New commented added');
  });
});


// SEARCH USER
router.get('/uploadUser', (req, res) => {
  model.getUser(req.query, (err, data) => {
    if (err) throw (err);
    res.status(200).send(data);
  });
});


// LOG OUT
router.get('/destroycookie', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.status(200).send('User Session was destroyed');
  });
});


// REGISTER NEW USER
router.post('/newuser', (req, res) => {
  let data = req.body;
  data.profilepic = req.files.imageCropped[0].filename;

  upload(req, res, (err) => {
    if (err) return next(err)
  });

  model.newUser(data);
  res.status(201).redirect('/');
});


// NEW MIX/MULTI UPLOAD
router.post('/upload', (req, res) => {
  let data = req.body;
  data.isMix = JSON.parse(data.isMix)

  if (data.isMix) {
    data.file = JSON.stringify(req.files.mixFile[0]);
    data.image = JSON.stringify(req.files.image[0]);

    // send the Mix to mySQL Db
    model.newMix(data);
  } else {
    data.previewFile = JSON.stringify(req.files.previewFile[0]);
    data.files = JSON.stringify(req.files.multitrackFiles);
    data.image = JSON.stringify(req.files.image[0]);

    // send the Multitrack to mySQL Db
    model.newMultitrack(data);
  }

  // Store files in Multer's folder
  upload(req, res, (err) => {
    if (err) return next(err);
  });

  res.status(201).send('Success, upload data has been saved');
});



module.exports = router;
