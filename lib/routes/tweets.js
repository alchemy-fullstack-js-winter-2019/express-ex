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
      res.send(createdTweet);
    });
  })

  .put('/:id', (req, res, next) => {
    // Destructuring is a good idea here to avoid sending extra stuff to db
    // const { handle, text } = req.body;
    Tweets.findByIdAndUpdate(req.params.id, req.body, (err, updatedTweet) => {
      if(err) return next(err);
      res.send(updatedTweet);
    });
  })

  .delete('/:id', (req, res, next) => {
    Tweets.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      if(err) return next(err);
      res.send(deletedTweet);
    });
  })

  .get('/:id', (req, res, next) => {
    Tweets.findById(req.params.id, (err, tweet) => {
      if(err) 
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, 'Bad Id'));
        } else {
          return next(err);
        }
      res.send(tweet);
    });
  })

  .get('/', (req, res, next) => {
    Tweets.find((err, allTweets) => {
      if(err) return next(err);
      res.send(allTweets);
    });
  })

  .delete('/:id', (req, res, next) => {
    Tweets.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      if(err) return next(err);
      res.send(deletedTweet);
    });
  });
