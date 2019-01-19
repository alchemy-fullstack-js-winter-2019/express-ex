const express = require('express');
const app = express();
const tweets = require('./routes/tweets');

app.use((req, res, next) => {
  console.log(req.method, 'Request Incoming');
  next();
});


app.use(express.json());
app.use('/tweets', tweets);

module.exports = app;
