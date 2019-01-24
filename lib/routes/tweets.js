/* eslint-disable no-console */
const { Router } = require('express');
const Tweet = require('../models/Tweet');
const { HTTPError } = require('../middleware/error');

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
    Tweet.findById(req.params.id, (err, foundTweet) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HTTPError(400, `Bad Id: ${req.params.id}`));
        } else {
          return next(err);
        }
      }
      res.send(foundTweet);
    });
  })
  .get('/', (req, res, next) => {
    Tweet.find((err, listOfTweets) => {
      if(err) return next(err);
      res.send(listOfTweets);
    });
  })
  .put('/:id', (req, res, next) => {
    const { handle, text } = req.body;
    Tweet.findByIdAndUpdate(req.params.id, { handle, text }, (err, updatedTweet) => {
      res.send(updatedTweet);
      next();
    });
  })
  .delete('/:id', (req, res, next) => {
    Tweet.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      if(err) return next(err);
      res.send(deletedTweet);
    });
  });
