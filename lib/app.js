/*eslint-disable no-console*/

const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const notFound = require('./middleware/notFound');
const error = require('./middleware/error');

app.use(express.json());
app.use((req, res, next) => {
  req.startAt = Date.now();
  const responseTime = Date.now() - req.startAt;
  if(req) {
    console.log(req.method, req.originalUrl, [res.statusCode], responseTime);
  }
  next();
});
app.use('/tweets', tweets);
app.use('/tags', tags);
app.use((req, res, next) => {
  notFound(req, res, next);
});
app.use((err, req, res, next) => {
  error(err, req, res, next);
});

module.exports = app;
