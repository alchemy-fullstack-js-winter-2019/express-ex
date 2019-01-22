const { Router } = require('express');
const Tweet = require('../models/Tweet');


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
  
  .get('/:id', (req, res) => {
    const id = req.params.id;
    Tweet.findById(id, (err, tweet) => {
      res.send(tweet);
    });
  });  
  


 

