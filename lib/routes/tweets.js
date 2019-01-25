const { Router } = require('express');
const Tweet = require('../models/Tweet');
const { HttpError } = require('../middleware/error');

module.exports = Router()
  .post('/', (req, res) => {
    const { handle, text } = req.body;
    Tweet.create({ 
      handle,
      text 
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })

  .get('/', (req, res) => {
    Tweet.find((err, listOfTweets) => {
      res.send(listOfTweets);
    });
  })

  .get('/:id', (req, res, next) => {
    Tweet.findById(req.params.id, (err, tweet) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, `Bad id: ${req.params.id}`));
        }
        else {
          return next(err); 
        }
      }
      res.send(tweet);
    });
  })

  .put('/:id', (req, res) => {
    const { handle, text } = req.body;
    Tweet.findByIdAndUpdate(req.params.id, 
      { handle, text },
      (err, updatedTweet) => res.send(updatedTweet));
  })
  
  .delete('/:id', (req, res, next) => {
    Tweet.findByIdAndDelete(req.params.id, (err, data) => {
      if(err) return next(err);
      res.send(data);
    });
  });
