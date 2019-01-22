const express = require('express');
const app = express();
const tweets = require('./routes/tweets');

app.use(express.json());
app.use('/tweets', tweets);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} [${res.statusCode}]`);
  next();
});

module.exports = app;
