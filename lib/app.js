const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');

app.use(express.json());

app.use((req, res, next) => {
  console.log('Request Incoming:', req.method, req.url, [res.statusCode]);
  next();
});

app.use('/tweets', tweets);
app.use('/tags', tags);

module.exports = app;
