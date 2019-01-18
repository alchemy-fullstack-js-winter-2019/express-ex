const express = require('express');
const app = express();
const tweets = require('./routes/tweets');

app.get('/another', (req, res) => {
  res.send('another hi from app.js');
});

app.get('/:id', (req, res) => { //:id means a variable of id
  res.send(res.params.id);      //then grabs that variable
  console.log(res.params.id);   //params is express syntax
});

app.use('/tweets', tweets);  //path, endpoint - 
//anything that starts with "/tweets" will use the tweets router
//we created above
app.use(express.json());

module.exports = app;
