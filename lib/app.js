const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');

app.use((req, res, next) => { 
  req.startTime = Date.now();
  res.on('finish', () => {
    const responseTime = Date.now() - req.startTime;
    console.log(`${req.method} ${req.url} [${res.statusCode}] - ${responseTime}ms`);
  });
  next();
});

app.use(express.json());
app.use('/tweets', tweets);
app.use('/tags', tags);
app.use(notFound);
app.use(handler);


module.exports = app;
