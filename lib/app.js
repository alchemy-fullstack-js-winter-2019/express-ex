const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');


app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(express.json());

app.use('/tweets', tweets);
app.use('/tags', tags);

module.exports = app;

