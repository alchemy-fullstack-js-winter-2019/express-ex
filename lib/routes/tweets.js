const { Router } = require('express');
const Tweets = require('../../lib/models/Tweets');
const { HttpError } = require('../middleware/error');


module.exports = Router()
  .put('/:id', (req, res, next) => {
    const { handle, text } = req.body;
    Tweets.findByIdAndUpdate(req.params.id, {
      handle,
      text
    }, (err, updatedTweet) => {
      if(err) return next(err);
      res.send(updatedTweet);
    });
  })
  .post('/', (req, res, next) => {
    const { handle, text } = req.body;
    Tweets.create({
      handle,
      text
    }, (err, createdTweet) => {
      if(err) return next(err);
      res.send(createdTweet);
    });
  })
  .get('/', (req, res, next) => {
    Tweets.find((err, listOfTweets) => {
      if(err) return next(err);
      res.send(listOfTweets);
    });
  })
  .get('/:id', (req, res, next) => {
    if(req.params.id) {
      Tweets.findById(req.params.id, (err, foundTweet) => {
        if(err) {
          if(err.code === 'ENOENT') {
            return next(new HttpError(400, `Bad Id: ${req.params.id}`));
          } else {
            return next(err);
          }
        }
        res.send(foundTweet);
      });
    }
  })
  .delete('/:id', (req, res, next) => {
    Tweets.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      if(err) return next(err);
      res.send(deletedTweet);
    });
  });
