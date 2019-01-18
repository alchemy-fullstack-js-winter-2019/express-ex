const express = require('express');
const app = express();
const tweets = require('./routes/tweets');

app.use(express.json());
app.use('/tweets', tweets);

app.use('/tweets/abcd', tweets);
app.use('/tweets/abcd/1234', tweets);

module.exports = app;
