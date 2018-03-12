let express = require('express');
let path = require('path');
let model = require('../models/index.js');
let bodyParser = require('body-parser');
let encrypt = require('../encryptor/index.js');
let router = express.Router();
let session = require('express-session');
let FileStore = require('session-file-store')(session);
let multer = require('multer');
const multerFields = require('./multerFields.js');

// MULTER SETUP
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../userfiles'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_'+ file.originalname);
  }
})
let upload = multer({'storage': storage}).fields(multerFields);


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

// USERLOGIN
router.post('/login', (req, res) => {
  let queryData = req.body;

  model.get(queryData, function(err, data) {
    if (err) throw err;
    console.log('this is data from queryData after DB call', data);
    let pwHashed = typeof data[0] === 'object' ?
     encrypt.makeHashPw(queryData.pw, data[0].salt) : false;

    if (pwHashed && pwHashed === data[0].pw) {
      req.session.uid = data[0].id;
      req.session.firstname = data[0].firstname;
      console.log('this is the user data from DB after login', data);
      res.status(201).send(JSON.stringify(data[0]));
    } else {
      res.status(401).send(false);
    }
  });
});

router.get('/session', (req, res) => {
  model.getSession(req.session, function(err, data) {
    console.log('this is the DB query return inside /session', data);
    if (data.length === 0) {
      res.send(false);
    }
    !data[0] ? res.end() : res.send(JSON.stringify(data[0]));
  });
})

router.get('/tracks', (req, res) => {
  let queryData = req.query;

  model.get(queryData, function(err, data) {
    if (err) throw err;
    console.log('this is the data with mixes and multitracks together...', data)
    res.status(200).send(JSON.stringify(data));
  });
});

router.get('/destroycookie', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send('User Session has been destroyed on the server');
  })

});

// REGISTER NEW USER
router.post('/newuser', (req, res) => {
  let data = req.body;
  data.profilepic = req.files.imageCropped[0].filename;

  upload(req, res, (err) => {
    if (err) return next(err)
    console.log('Profile Img has been stored');
  });

  model.newUser(data);
  res.status(201).redirect('/');
});


// HANDLE NEW UPLOAD
router.post('/upload', (req, res) => {
  let data = req.body;
  data.isMix = JSON.parse(data.isMix)

  if (data.isMix) {
    console.log(typeof data.isMix)
    data.file = JSON.stringify(req.files.mixFile[0]);
    data.image = JSON.stringify(req.files.image[0]);
    model.newMix(data);
  } else {
    data.previewFile = JSON.stringify(req.files.previewFile[0]);
    data.files = JSON.stringify(req.files.multitrackFiles);
    data.image = JSON.stringify(req.files.image[0]);
    model.newMultitrack(data);
  }

  // Store files in Multer's folder
  upload(req, res, (err) => {
    if (err) return next(err);
  });

  res.status(201).send('Success, upload data has been saved');
});



module.exports = router;
