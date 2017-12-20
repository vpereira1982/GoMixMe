let express = require('express');
let app = express();
let path = require('path');
let routes = require('./controllers/routes');
let session = require('express-session');

// Add routes & middleware
app.use('/', express.static(__dirname + '/public'));
app.use('/api', routes);

// Server listens
let port = process.env.PORT || 8080;

app.use('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, (err, success) => {
  err ? console.log('There was an error loading the server') : console.log('SERVER is live on port: ' + port);
});

module.exports = app;