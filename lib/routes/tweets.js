const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, text } = req.body;
    Tweet.create({
      handle, 
      text
    }, (err, createdTweet) => {
      if(err) return next(err);
      res.send(createdTweet);
    });
  })

  .get('/', (req, res, next) => {
    Tweet.find((err, listOfTweets) => {
      if(err) return next(err);
      res.send(listOfTweets);
    });
  })

  .get('/:id', (req, res, next) => {
    Tweet.findById(req.params.id, (err, foundTweet) => {
      if(err) return next(err);
      res.send(foundTweet);
    });
  })

  .put('/:id', (req, res, next) => {
    const { handle, text } = req.body;
    Tweet.findByIdAndUpdate(req.params.id,
      { handle, text },
      (err, updated) => {
        if(err) return next(err);
        res.send(updated);
      });
  })

  .delete('/:id', (req, res, next) => {
    Tweet.findByIdAndDelete(req.params.id, (err, data) => {
      if(err) return next(err);
      res.send(data);
    });
  });
