const { Router } = require('express');
const { 
  getTweets, 
  postTweet,
  delTweet 
} = require('../models/Tweets');

module.exports = Router()
  .post('/', (req, res) => {
    const tweet = req.body;
    postTweet(tweet);
    res.send(getTweets()[tweet._id]);
  })

  .delete('/:id', (req, res) => {
    const id = req.body._id;
    if(!id) res.send({ deleted: 0 });
    delTweet(req.body._id);
    res.send({ deleted: 1 });
  });
