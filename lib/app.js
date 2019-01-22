const express = require('express');
const app = express();
const tweets = require('./routes/tweets');

//this is middleware!
app.use('/tweets', tweets);  //path, endpoint - 
//anything that starts with "/tweets" will use the tweets router
//we created above, appended onto tweets
app.use(express.json());

module.exports = app;

