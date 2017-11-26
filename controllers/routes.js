let express = require('express');
let model = require('../models/index.js');
let bodyParser = require('body-parser');
let encrypt = require('../encryptor/index.js');
let router = express.Router();
let session = require('express-session');
let FileStore = require('session-file-store')(session);

// MULTER SETUP
let multer = require('multer');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {

    // change the below to a dynamic folder using path.join()
    cb(null, './public/userfiles');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_'+ file.originalname);
  }
})
let upload = multer({'storage': storage}).fields([{'name': 'image'}, {'name': 'audiofile'}, {'name': 'croppedImage'}]);


// LOAD SESSION SETTINGS
router.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  cookie: {maxAge: 60000},
  resave: true,
  store: new FileStore()
}));


// LOAD MIDDLEWARE
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

    let pwHashed = typeof data[0] === 'object' ? encrypt.makeHashPw(queryData.pw, data[0].salt) : false;

    if (pwHashed && pwHashed === data[0].pw) {
      console.log('this is the req.session AFTER the user logs in', req.session.id);
      res.status(200).send(JSON.stringify(data[0]));
    } else {
      res.status(200).send(false);
    }
  });
});

router.get('/session', function(req, res) {
  let queryData = req.query;
  model.getSession(queryData, function(err, data) {
    if (data.length === 0) {
      res.send(false);
    }
    res.send(JSON.stringify(data[0]));
  });
})

router.get('/all', function(req, res) {
    let queryData = req.query;
    model.get(queryData, function(err, data) {
      if (err) throw err;
      res.status(200).send(JSON.stringify(data));
    });
});


// POST REQUESTS
router.post('/', function(req, res, next) {
  let data = req.body;
  console.log('this is req.file', req.files)
  console.log('this is the req.body', req.body)


  console.log('This is the Form data from the POST request:', data);
  upload(req, res, function (err) {
    if (err) return next(err)
    console.log('File has been stored');
  });

  model.post(data);
  res.status(201).redirect('/');
});

module.exports = router;
