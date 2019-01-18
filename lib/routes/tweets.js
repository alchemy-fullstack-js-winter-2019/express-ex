const { Router } = require('express');
const Tweets = require('../models/Tweets');


module.exports = Router() 

  .post('/', (req, res) => {
    const { handle, text } = req.body;
    Tweets.create({
      handle,
      text
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })

  .get('/tweets/:id', (req, res) => {
    Tweets.find(req.params.id, (err, tweet) => {
      res.send(err, tweet);
    });
  });

