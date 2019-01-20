const { Router } = require('express');
const Tweets = require('../models/Tweets');


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
  });

 

