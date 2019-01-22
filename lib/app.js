/* eslint-disable no-console*/

const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const notFound = require('./middleware/notFound');

app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);
app.use('/notfound', notFound);

app.use((req, res, next) => {
  req.startAt = Date.now();
  const responseTime = Date.now() - req.startAt;
  console.log(`${req.method} '${req.path}' [${res.statusCode}] ${responseTime}`);
  next();
});


module.exports = app;
