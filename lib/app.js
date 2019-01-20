const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const notFound = require('./middleware/notFound');

app.use(express.json());

app.use((req, res, next) => {
  req.startAt = Date.now();
  next();
});

app.use((req, res, next) => {
  console.log(`Request Incoming: ${req.method} ${req.url} ${[res.statusCode]}`);
  next();
});

app.use((req, res, next) => {
  const responseTime = Date.now() - req.startAt;
  console.log(`- ${responseTime}ms`);
  next();
});

app.use('/tweets', tweets);
app.use('/tags', tags);

app.use(notFound);

module.exports = app;
