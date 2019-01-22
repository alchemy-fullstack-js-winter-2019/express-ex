const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const notFound = require('../lib/middleware/notFound');
const error = require('../lib/middleware/error');

// middleware 
app.use((req, res, next) => {
  console.log(req.method, req.path, [res.statusCode]);
  next();
});

app.use((req, res, next) => {
  req.startAt = Date.now();
  const responseTime = Date.now() - req.startAt;
  console.log(responseTime);
  next();
});

app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);
app.use(notFound);
app.use(error);

module.exports = app;
