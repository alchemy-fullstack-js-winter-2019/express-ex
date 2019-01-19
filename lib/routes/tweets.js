const { Router } = require('express');
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res) => {
    const { handle, text } = req.body;
    Tweet.create({
      handle,
      text
    }, (err, createdTweet) => {
      res.send(createdTweet);
    });
  })
  .get('/:id', (req, res) => {
    const _id = req.params.id;
    Tweet.findById(_id, (err, tweet) => {
      res.send(tweet);
    });
  })
  .get('/', (req, res) => {
    Tweet.find((err, tweets) => {
      res.send(tweets);
    });
  })
  .put('/:id', (req, res) => {
    Tweet.findByIdAndUpdate(req.params.id, req.body, (err, updatedTweet) => {
      res.send(updatedTweet);
    });
  })
  .delete('/:id', (req, res) => {
    Tweet.findByIdAndDelete(req.params.id, (err, deletedTweet) => {
      res.send(deletedTweet);
    });
  });
