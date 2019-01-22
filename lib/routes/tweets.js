const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    const { handle, tweet } = req.body;
    Tweet.create({
      handle,
      tweet
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })
  .put('/:id', (req, res) => {
    Tweet.findByIdAndUpdate(req.params.id, req.body, (err, updatedTweet) => {
      res.send(updatedTweet);
    });
  })
  .get('/', (req, res) => {
    Tweet.find((err, listOfTweets) => {
      res.send(listOfTweets);
    });
  })
  .get('/:id', (req, res) => {
    Tweet.findById(req.params.id, (err, tweet) => {
      res.send(tweet);
    });
  })
  .delete('/:id', (req, res) => {
    Tweet.findByIdAndDelete(req.params.id, err => {
      if(err) {
        res.statusCode = 400;
        res.send({ deleted: 0 });
      } else {
        res.send({ deleted: 1 });
      }
    });  
  });
