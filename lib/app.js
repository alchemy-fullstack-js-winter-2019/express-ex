const express = require('express');
const app = express();
const tweets = require('./routes/tweets');

app.use(tweets);

app.get('/:id', (req, res) => {
  res.send(req.params.id);
});

module.exports = app;
