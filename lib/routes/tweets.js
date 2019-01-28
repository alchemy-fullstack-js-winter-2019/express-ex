const { Router } = require('express');
const Tweet = require('../models/Tweet');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  //post a tweet
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
  //get individual tweet
  .get('/:id', (req, res, next) => {
  
    Tweet.findById(req.params.id, (err, foundTweet) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, `Bad Id: ${req.params.id}`));
        }
        else {
          return next(err);
        }
      }
      res.send(foundTweet);
    });
  })
  .get('/', (req, res, next) => {
    Tweet.find((err, tweets) => {
      if(err) return next(err);
      res.send(tweets); 
    });
  })
  .put('/:id', (req, res, next) => {
    const { handle, text } = req.body;
    Tweet.findByIdAndUpdate(req.params.id, { handle, text }, (err, updatedTweet) => {
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
