const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');

app.use((req, res, next) => {
  console.log(req.method, req.path, [res.statusCode]); // eslint-disable-line no-console
  next();
});

app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to my amazing Express app');
});

module.exports = app;
