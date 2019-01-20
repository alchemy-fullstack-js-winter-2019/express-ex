const { Router } = require('express');
const Tweets = require('../models/Tweets');
//QUESTIONS: when is req.params needed?

console.log('WTF');
module.exports = Router()
  .post('/', (req, res) => {
    const { handle, text } = req.body;
    Tweets.create({ 
      handle,
      text
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })
  .get('/:id', (req, res) => {
    Tweets.findById(req.params.id, (err, foundTweet) => {
      res.send(foundTweet);
    });
  })
  .get('/', (req, res) => {
    Tweets.find((err, allTweets) => {
      res.send(allTweets);
    });
  });

 

