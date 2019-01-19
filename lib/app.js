const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');

app.use(express.json());
app.use((req, res, next) => {
  console.log('Request Method: ', req.method);
  console.log('Request URL: ', req.originalUrl);
  next();
});
app.use('/tweets', tweets);
app.use('/tags', tags);


module.exports = app;
