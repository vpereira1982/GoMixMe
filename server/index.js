const express = require('express');
const app = express();
const path = require('path');
const routes = require('./controllers/routes');
const favicon = require('serve-favicon')


// Add routes & middleware
app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')))
app.use('/', express.static(path.join(__dirname, '../client')));
app.use('/api', routes);

// Server listens
let port = process.env.PORT || 8080;

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


app.listen(port, (err, success) => {
  err ? console.log('There was an error loading the server') : console.log('SERVER is live on port: ' + port);
});

module.exports = app;