const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  })
  .get('/', (req, res, next) => {
    Tweet.find((err, listOfTweets) => {
      if(err) return next(err);
      res.send(listOfTweets);
    });
  })
  .post('/', (req, res, next) => {
    Tweet.create({
      handle: req.body.handle,
      text: req.body.text
    }, (err, createdTweet) => {
      if(err) return next(err);
      res.send(createdTweet);
    });
  })
  .put('/:id', (req, res, next) => {
    Tweet.findByIdAndUpdate(req.params.id, req.body, (err, foundTweet) => {
      if(err) return next(err);
      res.send(foundTweet);
    });
  })
  .delete('/:id', (req, res, next) => {
    Tweet.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      if(err) return next(err);
      res.send(deletedTweet);
    });
  });
