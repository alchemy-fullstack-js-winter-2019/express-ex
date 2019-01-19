const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const notFound = require('./middleware/notFound');
const error = require('./middleware/error');

app.use((req, res, next) => {
  req.startAt = Date.now();
  const responseTime = Date.now() - req.startAt;
  // eslint-disable-next-line no-console
  console.log('Request Incoming!', 'Method: ' + req.method, 'URL: ' + req.url, 
    'Status Code: ' + res.statusCode, 'Response time: ' + responseTime + 'ms');
  next();
});

app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);
app.use(notFound);
app.use(error);

module.exports = app;
