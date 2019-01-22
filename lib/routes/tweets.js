const { Router } = require('express');
const Tweet = require('../models/Tweet');
const { HttpError } = require('../middleware/error');

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
  .get('/:id', (req, res, next) => {
    Tweet.findById(req.params.id, (err, tweet) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, `Bad Id: ${req.params.id}`));
        } else {
          return next(err);
        }
      }
      res.send(tweet);
    });
  })
  .get('/', (req, res, next) => {
    Tweet.find((err, tweets) => {
      if(err) return next(err);
      res.send(tweets);
    });
  })
  .put('/:id', (req, res, next) => {
    Tweet.findByIdAndUpdate(req.params.id, req.body, (err, updatedTweet) => {
      if(err) return next(err);
      res.send(updatedTweet);
    });
  })
  .delete('/:id', (req, res, next) => {
    Tweet.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      if(err) return next(err);
      res.send(deletedTweet);
    });
  });
