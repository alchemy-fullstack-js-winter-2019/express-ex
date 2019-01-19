const { Router } = require('express');
const { 
  getTweets, 
  getTweet,
  postTweet,
  delTweet,
  updateTweet
} = require('../models/Tweets');

module.exports = Router()
  .post('/', (req, res) => {
    const tweet = req.body;
    postTweet(tweet);
    res.send(getTweets()[tweet._id]);
  })

  .delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!getTweet(id)) res.send({ deleted: 0 });
    delTweet(req.body._id);
    res.send({ deleted: 1 });
  })

  .put('/:id', (req, res) => {
    const id = req.params.id;
    if(!getTweet(id)) res.send('id does not exist!');
    res.send(updateTweet(id, req.body));
  })

  .get('/', (req, res) => res.send(getTweets()));
