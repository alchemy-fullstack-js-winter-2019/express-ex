const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
//* or data/tweets
//this is middleware!
app.use(express.json());
app.use('/tweets', tweets);  //path, endpoint - 
//anything that starts with "/tweets" will use the tweets router
//we created above, appended onto tweets

module.exports = app;
