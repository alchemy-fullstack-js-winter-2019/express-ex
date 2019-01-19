const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');

// middleware 
app.use((req, res, next) => {
  req.startAt = Date.now();
  const responseTime = Date.now() - req.startAt;
  console.log(req.method, req.path, [res.statusCode], responseTime);
  next();
});

app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);

module.exports = app;
