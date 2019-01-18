const express = require('express');
const app = express();
const tweets = require('./routes/tweets');


app.use('/tweets', tweets);

app.get('/', (req, res) => {
  res.status(200).send('Hi');
});

module.exports = app;
