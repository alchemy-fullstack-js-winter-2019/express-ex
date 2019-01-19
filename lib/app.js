/* eslint-disable no-console*/

const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');

// middleware is executed in order 'next'
// app.use((req, res, next) => {
//   console.log('Request incoming');
//   next();
// });

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Request for '${req.method}' on '${req.path}', Status:${req.statusCode}, Time:${req.startAt = Date.now()}`);
  next();
});
app.use('/tweets', tweets);
app.use('/tags', tags);

module.exports = app;
