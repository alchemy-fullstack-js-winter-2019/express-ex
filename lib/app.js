/* eslint-disable no-console */
const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const notFound = require('./middleware/notFound');
const error = require('./middleware/error');

app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);
app.use(notFound);
app.use(error);

app.use((req, res, next) => {
  console.log('GET /tweets');
  next();
});

app.use((req, res, next) => {
  req.startAt = Date.now();
  const responseTime = Date.now() - req.startAt;
  console.log('Request incoming!', 'Method: ' + req.method, 'URL: ' + req.url,
    'Status Code: ' + res.status, 'Response time: ' + responseTime + 'ms');
  next();
});


module.exports = app;
