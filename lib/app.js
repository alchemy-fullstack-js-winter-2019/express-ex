const express = require ('express');
const app = express();
const tweets = require('./routes/tweets');

app.use(express.json()); //applies the boby parsing middleware to all routes

app.use('/tweets', tweets);


//move to routes > tweets.js
// app.get('/',(req, res) => {
//   res.end('hi');
// });

// app.get('/:id', (req, res) => { //this is how you get variables with :
//   res.end(req.params.id);
// })

// app.get('/another', (req, res) => {
//   res.end('another\n');
// });

module.exports = app;
