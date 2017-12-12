let express = require('express');
let path = require('path');
let model = require('../models/index.js');
let bodyParser = require('body-parser');
let encrypt = require('../encryptor/index.js');
let router = express.Router();
let session = require('express-session');
let FileStore = require('session-file-store')(session);
let multer = require('multer');

// MULTER SETUP
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../userfiles'));
  },
  filename: function (req, file, cb) {
    console.log('this is file.originalname 18', JSON.stringify(file.originalname));
    cb(null, Date.now() + '_'+ file.originalname);
  }
})
let upload = multer({'storage': storage}).fields([
  {'name': 'image'},
  {'name': 'audiofile'},
  {'name': 'imageCropped'}
]);


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



// GET REQUESTS
router.get('/login', function(req, res) {
  let queryData = req.query;
  model.get(queryData, function(err, data) {
    if (err) throw err;

    let pwHashed = typeof data[0] === 'object' ?
     encrypt.makeHashPw(queryData.pw, data[0].salt) : false;

    if (pwHashed && pwHashed === data[0].pw) {
      req.session.uid = data[0].id;
      req.session.firstname = data[0].firstname;
      console.log('this is the user data from DB after login', data);
      res.status(200).send(JSON.stringify(data[0]));
    } else {
      res.status(200).send(false);
    }
  });
});

router.get('/session', function(req, res) {
  model.getSession(req.session, function(err, data) {
    console.log('this is the DB query return inside /session', data);
    if (data.length === 0) {
      res.send(false);
    }
    !data[0] ? res.end() : res.send(JSON.stringify(data[0]));
  });
})

router.get('/all', function(req, res) {
    let queryData = req.query;
    model.get(queryData, function(err, data) {
      if (err) throw err;
      res.status(200).send(JSON.stringify(data));
    });
});

router.get('/destroycookie', function(req, res) {
  req.session.destroy((err) => {
    if (err) throw err;
    res.send('User Session has been destroyed on the server');
  })

});

// POST REQUESTS
router.post('/', function(req, res) {
  let data = req.body;
  console.log('this is req.file', req.files)
  console.log('this is the req.body', req.body)

  upload(req, res, function (err) {
    if (err) return next(err)
    console.log('File has been stored');
  });

  model.post(data);
  res.status(201).redirect('/');
});

module.exports = router;
