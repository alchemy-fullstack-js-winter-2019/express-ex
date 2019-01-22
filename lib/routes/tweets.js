const { Router } = require('express');
const Tweets = require('../models/Tweet');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res) => {
    const { handle, text } = req.body; // what exactly does this  mean?
    Tweets.create({
      handle,
      text
    }, (err, createdTweet) => {
      if(err) return next(err);
      res.send(createdTweet); // what is the response/what does it contain? What does .send do?
    });
  })

  .get('/', (req, res) => {
    Tweets.find((err, listOfTweets) => {
      res.send(listOfTweets);
    });
  })

  .get('/:id', (req, res, next) => {
    Tweets.findById(req.params.id, (err, tweet) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, `Bad Id: ${req.params.id}`));
        }
      }
      res.send(tweet);
    });
  })

  .put('/:id', (req, res, next) => {
    const { handle, text } = req.body;
    Tweets.findByIdAndUpdate(req.params.id,
      { handle, text },
      (err, updated) => {
        if(err) return next(err);
        res.send(updated);
      });
  })

  .delete('/:id', (req, res, next) => {
    Tweets.findByIdAndDelete(req.params.id, (err, data) => {
      if(err) return next(err);
      res.send(data);
    });
  });