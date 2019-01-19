const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');

app.use(express.json());

app.use('/tweets', tweets);

app.use('/tags', tags);

// app.get('/', (req, res) => {
//   res.end('hi');
// });


module.exports = app;
