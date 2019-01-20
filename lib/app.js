const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
//express.json parses the body.
app.use(express.json());
//(path, tweets router)
app.use('/tweets', tweets);//middleware

app.get('/:id', (req, res)=> {
  res.end(req.params.id);
});
module.exports = app;
