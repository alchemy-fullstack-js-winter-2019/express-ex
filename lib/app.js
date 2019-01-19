const express = require('express');
const app = express();
const tweets = require('./routes/tweets');

// app.get('/:name', (req, res) => {
//   res.end('req.params.name');
// });
app.use(express.json());
app.use('/tweets', tweets);

module.exports = app;



