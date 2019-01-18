const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    console.log('banana', req);
    const { handle, text } = req.body;
    Tweet.create({
      handle, 
      text
    }, (err, createdTweet) => {
      console.log('create treat!', createdTweet);
      res.send(createdTweet);
    });
  });
