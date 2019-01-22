const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const notFound = require('../lib/middleware/notFound');
const error = require('../lib/middleware/error');
const ronSwanson = require('../lib/middleware/ronSwanson');

// middleware 
app.use((req, res, next) => {
  req.startTime = Date.now();
  res.on('finish', () => {
    const responseTime = Date.now() - req.startTime;
    console.log(`${req.method} ${req.path} [${res.statusCode}] - ${responseTime}ms`);
  });
  next();
});

app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);
app.use('/random', ronSwanson, (req, res) => {
  res.send('hello?');
});
app.use(notFound);
app.use(error);

module.exports = app;
