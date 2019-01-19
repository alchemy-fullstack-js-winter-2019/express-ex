const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');

// middleware 
// app.use((req, res, next) => {
//   console.log('Request incoming');
//   next();
// });

app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);


module.exports = app;
