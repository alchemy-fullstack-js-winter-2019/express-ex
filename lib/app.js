const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const people = require('./routes/people');

app.use((req, res, next) => {
  /* eslint-disable-next-line */
  console.log('Request Incoming!',
    req.method, req.url, res.statusCode);
  next();
});

app.use(express.json());
app.use('/tweets', tweets);
app.use('/people', people);

module.exports = app;
