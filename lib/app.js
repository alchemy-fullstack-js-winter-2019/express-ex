const express = require('express');
const app = express();
const Tweets = require('./routes/tweets');
const Tags = require('./routes/tags');

app.use(express.json());

app.use('/tweets', Tweets);
app.use('/tags', Tags);


module.exports = app;
