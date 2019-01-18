const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  //post a tweet
  .post('/', (req, res) => {
    const { handle, text } = req.body;
    Tweet.create({
      handle,
      text
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })
  //get individual tweet
  .get('/:id', (req, res) => {
  
    Tweet.findById(req.params.id, (err, foundTweet) => {
      res.send(foundTweet);
    });
  })
  //get all tweets
  .get('/', (req, res) => {
    Tweet.find((err, tweets) => {
      res.send(tweets); 
    });
  })
  .put('/:id', (req, res) => {
    const { handle, text } = req.body;
    Tweet.findByIdAndUpdate(req.params.id, { handle, text }, (err, updatedTweet) => {
      res.send(updatedTweet);
    });
     
  
  });

