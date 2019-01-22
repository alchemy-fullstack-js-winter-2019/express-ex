const { Router } = require('express');
const Tweets = require('../models/Tweets');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, text } = req.body;
    Tweets.create({ 
      handle,
      text 
    }, (err, createdTweet) => {
      if(err) return next(err);
      else {
        res.send(createdTweet);
      }
    });
  })

  .get('/:id', (req, res, next) => {
    Tweets.findById(req.params.id, (err, tweet) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, 'Bad Id'));
        }
        else {
          return next(err);
        }
      }
      else {
        res.send(tweet);
      }
    });
  })

  .put('/:id', (req, res, next) => {
    const _id = req.params.id;
    const { handle, text } = req.body;
    Tweets.findByIdAndUpdate(_id, {
      handle,
      text
    }, (err, updatedTweet) => {
      if(err) return next(err);
      else {
        res.send(updatedTweet);
      }
    });
  })

  .delete('/:id', (req, res, next) => {
    Tweets.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      if(err) return next(err);
      else {
        res.send(deletedTweet);
      }
    });
  })

  .get('/', (req, res, next) => {
    Tweets.find((err, tweets) => {
      if(err) return next(err);
      else {
        res.send(tweets);
      }
    });
  });
