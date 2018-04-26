const express = require('express');
const path = require('path');
const model = require('../models/index.js');
const bodyParser = require('body-parser');
const encrypt = require('../encryptor/index.js');
const request = require('request');
const router = express.Router();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const multer = require('multer');
const multerFields = require('./multerFields.js');
const archiver = require('archiver');
const AWS = require('aws-sdk');
const S3keys = require('../keys/S3keys.js');
const S3path = 'https://gomixme.s3.us-east-2.amazonaws.com/gomixme/';
const fs = require('fs');

// AWS SETUP
const s3bucket = new AWS.S3({
  endpoint: 's3.us-east-2.amazonaws.com',
  region: 'us-east-2',
  accessKeyId: S3keys.key,
  secretAccessKey: S3keys.secret,
  Bucket: S3keys.bucket,
  signatureVersion: 'v4'
});

const storeS3 = (filePath, fileName) => {
    let fileStream = fs.createReadStream(filePath);
    let params = {
      Bucket: 'gomixme',
      Key: fileName,
      Body: fileStream,
      ACL: 'public-read'
    }

    s3bucket.upload(params, {queueSize: 3, partSize: 1024 * 1024 * 10})
      .on('httpUploadProgress', (upFile) => {
          console.log('Progress:', upFile.loaded, '/', upFile.total);
          if (upFile.loaded === upFile.total) {
            fs.unlinkSync(filepath);
          }
        })
      .send((err, data) => { console.log(err, data) });
}

// MULTER SETUP
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_'+ file.originalname);
  }
});

const upload = multer({storage}).fields(multerFields);

// SESSION SETTINGS
router.use(session({
  name: 'server-session-cookie-id',
  secret: 'GoMixMe 666',
  saveUninitialized: true,
  resave: false,
  cookie: {expires: 31536000000},
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
// MANUAL LOGIN
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

// SESSION LOGIN
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
    zip.append(request(each.url), { name: each.title });
  });

  // pipe the read-stream to the ZippedFile write-stream
  zip.pipe(zippedFile)

  zippedFile.on('finish', (err) => {
    res.download(zippedFile.path);
  })

  zip.finalize();
});

// DELETE ZIP FILE
router.delete('/delete', (req, res) => {
  fs.unlinkSync(__dirname + '/multitrack-files.zip');
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
router.post('/newUser', (req, res) => {
  let data = req.body;
  let hasPic = Object.prototype.hasOwnProperty.call(req.files, "imageCropped");
  data.profilepic = hasPic ? req.files.imageCropped[0].filename : 'default-profile.jpg';

  const checkNSaveUser = new Promise((resolve, reject) => {
    model.checkNewUser(data, (err, result) => {
      result.length ? reject(result) : resolve(result);
    });
  })

  // else, register this user
  checkNSaveUser.then((result) => {
    hasPic ? storeS3(req.files.imageCropped[0].path, data.profilepic) : null;
    model.newUser(data, (err, data) => {
      if (err) throw err;
      res.status(201).redirect('/');
    });
  })

  // if either pw/email exist, fail.
  checkNSaveUser.catch((error) => {
    res.status(401).send(error);
  })
});


// UPDATE USER INFO
router.post('/updateUser', (req, res) => {
  let data = req.body;

  if (!!req.files.imageCropped) {
    data.profilepic = req.files.imageCropped[0].filename;
    storeS3(req.files.imageCropped[0].path, data.profilepic);
  }

  model.updateUser(data, (err, data) => {
    if (err) throw err;
    res.status(201).send('User info updated!');
  });
});


// NEW MIX OR MT UPLOAD
router.post('/upload', (req, res) => {
  let data = req.body;
  data.isMix = JSON.parse(data.isMix)

  if (data.isMix) {
    data.file = JSON.stringify(req.files.mixFile[0]);
    data.image = JSON.stringify(req.files.image[0]);
    storeS3(req.files.mixFile[0].path, req.files.mixFile[0].filename);
    storeS3(req.files.image[0].path, req.files.image[0].filename);

    // send the Mix to mySQL Db
    model.newMix(data);
  } else {
    data.previewFile = JSON.stringify(req.files.previewFile[0]);
    data.files = JSON.stringify(req.files.multitrackFiles);
    data.image = JSON.stringify(req.files.image[0]);
    storeS3(req.files.image[0].path, req.files.image[0].filename);
    storeS3(req.files.previewFile[0].path, req.files.previewFile[0].filename);
    req.files.multitrackFiles.forEach(each => {
      storeS3(each.path, each.filename);
    });

    // send the Multitrack to mySQL Db
    model.newMultitrack(data);
  }
  res.status(201).send('Success, upload data has been saved');
});



module.exports = router;
