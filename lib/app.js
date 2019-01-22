const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');

app.use((req, res, next) => {
  req.startTime = Date.now();
  res.on('finish', () => {
  // eslint-disable-next-line
    console.log(`Request Incoming ${req.method} URL: ${req.url} [${res.statusCode}] - ${req.responseTime} ms`);
  });
  next();
});

app.use(express.json());
app.use('/tweets', tweets);

app.use(notFound);

app.use(handler);

module.exports = app;
