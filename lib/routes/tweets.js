const { Router } = require('express');
const { 
  getTweets, 
  postTweet 
} = require('../models/Tweets');

module.exports = Router()
  .post('/', (req, res) => {
    const tweet = req.body;
    postTweet(tweet);
    res.send(getTweets()[tweet._id]);
  });
