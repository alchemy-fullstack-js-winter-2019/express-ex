const express = require('express');
const app = express();
const tweets = require('./routes/tweets');

app.use('/tweets', tweets);

app.use(express.json());

app.get('/', (req, res) => {
  res.end('hi');
});

app.get('/:id', (req, res) => {
  res.end(req.params.id)
})
module.exports = app;
