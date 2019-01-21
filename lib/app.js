const express = require('express');
const app = express();
const tweets = require('./routes/tweets');
const tags = require('./routes/tags');
//express.json parses the body.
app.use(express.json());
//(path, tweets router)
app.use('/tweets', tweets);//middleware
app.use('/tags', tags);//middleware



app.get('/:id', (req, res)=> {
  res.send(req.params.id);
});
module.exports = app;
