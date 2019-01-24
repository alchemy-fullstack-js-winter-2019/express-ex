const express = require ('express');
const app = express();
const tweets = require('./routes/tweets');
const notFound = require('./middleware/notFound');
const { handler } = require('./middleware/error');



app.use((req, res, next) => {
  const path = req.url;
  req.startTime = Date.now();
  res.on('finish', () => {
    const responseTime = Date.now() - req.startTime;
    //eslint-disable-next-line
    console.log(`${req.method} ${path} ${req.statusCode} - ${responseTime}ms`); 
  });
  next();
});


app.use(express.json()); //applies the boby parsing middleware to all routes
app.use('/tweets', tweets);

app.use(notFound);

app.use(handler); 


module.exports = app;


