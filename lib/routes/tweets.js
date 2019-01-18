const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .put('/:id', (req, res) => {
    const { handle, tweet } = req.body;
    const id = req.params.id;
    Tweet.findByIdAndUpdate(id, {
      handle,
      tweet
    }, (err, updatedTweet) => {
      res.send(updatedTweet);
    });
  })
  .get('/:id', (req, res) => {
    res.end(req.params.id);
  })
  .post('/', (req, res) => {
    const { handle, tweet } = req.body;
    Tweet.create({
      handle,
      tweet
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })
  .get('/', (req, res) => {
    Tweet.find((err, listOfTweets) => {
      res.send(listOfTweets);
    });
  })
  
  
  .delete('/:id', (req, res) => {
    Tweet.findByIdAndDelete(req.params.id, err => {
      if(err) {
        res.statusCode = 400;
        res.send({ deleted: 0 });
      } else {
        res.send({ deleted: 1 });
      }
    });  
  });
