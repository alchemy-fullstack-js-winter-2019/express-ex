/*eslint-disable no-console*/

const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const random = require('./routes/random');
const notFound = require('./middleware/notFound');
const error = require('./middleware/error');

app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);
app.use('/random', random);
app.use((req, res, next) => {
  req.startTime = Date.now();
  const responseTime = Date.now() - req.startTime;
  res.on('finish', () => {
    console.log(req.method, req.originalUrl, [res.statusCode], '-', responseTime, 'ms');
  });
  next();
});
app.use(notFound);
app.use(error);

module.exports = app;
