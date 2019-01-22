const { Router } = require('express');
const Tweet = require('../models/Tweets');

module.exports = Router()

  .post('/', (req, res) => {
    // req.body.handle
    //req.body.text 
    const { handle, text } = req.body;
    Tweet.create({
      handle,
      text
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })

  .get('/:id', (req, res) => {
    Tweet.findById(req.params.id, (error, foundTweet) => {
      res.send(foundTweet);
    });
  })

  .get('/', (req, res) => {
    Tweet.find((err, tweetList) => {
      res.send(tweetList);
    });
  });

  

