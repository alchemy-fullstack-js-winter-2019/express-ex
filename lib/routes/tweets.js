const { Router } = require('express');
const Tweet = require('../models/Tweet');
const { HttpError } = require('../middleware/error');


module.exports = Router()
  .post('/', (req, res) => {
    const { handle, text } = req.body;
    Tweet.create({
      handle,
      text
    }, (err, createdTweet)  => {
      res.send(createdTweet);
    });
  })
    
  .get('/', (req, res) => {
    Tweet.find((err, tweets) => {
      res.send(tweets);
    });
  })
  
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Tweet.findById(id, (err, tweet) => {
      if(err) {
        if(err.code === 'ENOENT') {
          return next(new HttpError(400, 'Bad Id'));
        } else {
          return next(err);
        }
      }
      res.send(tweet);
    });
  })
  
  .put('/:id', (req, res) => {
    const _id = req.params.id;
    const { handle, text } = req.body;
    Tweet.findByIdAndUpdate(_id, {
      handle,
      text
    }, (err, updatedTweet) => {
      res.send(updatedTweet);
    });
  })
  
  .delete('/:id', (req, res) => {
    const _id = req.params.id;
    Tweet.findByIdAndDelete(_id, (err, data) => {
      res.send(data);
    });
  });
  


 

