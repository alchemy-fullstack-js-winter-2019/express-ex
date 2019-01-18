const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const people = require('./routes/people');

app.use(express.json());
app.use('/tweets', tweets);
app.use('/people', people);

module.exports = app;
