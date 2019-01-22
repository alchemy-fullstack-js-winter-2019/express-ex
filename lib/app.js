const express = require('express');
const app = express();
//const tweets = require('./routes/tweets');

app.get('/', function(req, res) {
  throw new Error('BROKEN'); // Express will catch this on its own.
});

app.use(express.json());

module.exports = app;

