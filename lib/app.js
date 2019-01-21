const express = require('express');
const app = express();
//const tweets = require('./routes/tweets');
console.log('this is app');
app.get('/another', (req, res) => {
  res.send('another hi from app.js');
});

app.get('/:id', (req, res) => { //:id means a variable of id
  res.send(res.params.id);      //then grabs that variable
  //console.log(res.params.id);   //params is express syntax
});

//this is middleware!
//app.use('/tweets', tweets);  //path, endpoint - 
//anything that starts with "/tweets" will use the tweets router
//we created above, appended onto tweets
app.use(express.json());

module.exports = app;
