const express = require('express');
const app = express();
const Tweets = require('./routes/tweets');

app.use('/tweets', Tweets);


module.exports = app;
