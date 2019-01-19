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

  .put('/:id', (req, res) => {
    Tweets.findByIdAndUpdate(req.params.id, req.body, (err, updatedTweet) => {
      res.send(updatedTweet);
    });
  })

  .delete('/:id', (req, res) => {
    Tweets.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      res.send(deletedTweet);
    });
  })

  .get('/:id', (req, res) => {
    Tweets.findById(req.params.id, (err, tweet) => {
      res.send(tweet);
    });
  })

  .get('/', (req, res) => {
    Tweets.find((err, allTweets) => {
      res.send(allTweets);
    });
  });

