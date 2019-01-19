const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  })
  .get('/', (req, res) => {
    Tweet.find((err, listOfTweets) => {
      res.send(listOfTweets);
    });
  })
  .post('/', (req, res) => {
    Tweet.create({
      handle: req.body.handle,
      text: req.body.text
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })
  .put('/:id', (req, res) => {
    Tweet.findByIdAndUpdate(req.params.id, req.body, (err, foundTweet) => {
      res.send(foundTweet);
    });
  })
  .delete('/:id', (req, res) => {
    Tweet.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      res.send(deletedTweet);
    });
  });
